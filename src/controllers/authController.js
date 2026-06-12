const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
const otpGenerator = require('otp-generator');
const sendEmail = require(
  '../utils/sendEmail'
);

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });


exports.register = async (
  req,
  res
) => {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    // CHECK USER
    const existingUser =
      await prisma.user.findUnique({
        where: { email },
      });

    if (existingUser) {
      return res.status(400).json({
        message:
          'Email already registered',
      });
    }

    // HASH PASSWORD
    const hashedPassword =
      await bcrypt.hash(password, 10);

    // GENERATE OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // CREATE USER
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,

        otpCode: otp,

        otpExpiredAt: new Date(
          Date.now() + 5 * 60 * 1000
        ),
      },
    });

    // SEND OTP EMAIL
    await sendEmail(
      email,
      'Verify Your StrawFuel Account',
      `Your OTP verification code is ${otp}`
    );

    res.status(201).json({
      message:
        'OTP verification sent to email',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.verifyRegisterOtp =
  async (req, res) => {
    try {
      const { email, otp } = req.body;

      const user =
        await prisma.user.findUnique({
          where: { email },
        });

      if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
      }

      if (user.otpCode !== otp) {
        return res.status(400).json({
          message: 'Invalid OTP',
        });
      }

      if (
        new Date() >
        user.otpExpiredAt
      ) {
        return res.status(400).json({
          message: 'OTP expired',
        });
      }

      // VERIFIED
      await prisma.user.update({
        where: {
          id: user.id,
        },

        data: {
          isVerified: true,

          otpCode: null,

          otpExpiredAt: null,
        },
      });

      res.json({
        message:
          'Account verified successfully',
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        message:
          'Please verify your email first',
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: 'Wrong password',
      });
    }

    // GENERATE OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // SAVE OTP
    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        otpCode: otp,

        otpExpiredAt: new Date(
          Date.now() + 5 * 60 * 1000
        ),
      },
    });

    // SEND EMAIL
    await sendEmail(
      user.email,
      'Your StrawFuel OTP Code',
      `Your OTP Code is ${otp}`
    );

    res.json({
      message:
        'OTP sent to your email',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    if (user.otpCode !== otp) {
      return res.status(400).json({
        message: 'Invalid OTP',
      });
    }

    if (
      new Date() > user.otpExpiredAt
    ) {
      return res.status(400).json({
        message: 'OTP expired',
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: '7d',
      }
    );

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        otpCode: null,
        otpExpiredAt: null,
      },
    });

    delete user.password;

    res.json({
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.forgotPassword = async (
  req,
  res
) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        otpCode: otp,

        otpExpiredAt: new Date(
          Date.now() + 5 * 60 * 1000
        ),
      },
    });

    await sendEmail(
      user.email,
      'Reset Password OTP',
      `Your reset OTP is ${otp}`
    );

    res.json({
      message:
        'Reset OTP sent to email',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

exports.resetPassword = async (
  req,
  res
) => {
  try {
    const {
      email,
      otp,
      newPassword,
    } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      });
    }

    if (user.otpCode !== otp) {
      return res.status(400).json({
        message: 'Invalid OTP',
      });
    }

    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        password: hashedPassword,
        otpCode: null,
        otpExpiredAt: null,
      },
    });

    res.json({
      message:
        'Password reset successful',
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};