const nodemailer = require('nodemailer');
const sparkPostTransporter = require('nodemailer-sparkpost-transport');
const path = require('path');
const pug = require('pug');

class Email {
  constructor() {
    this.from = 'Yohann Project <contact@yohann-project.site>';
    if (process.env.NODE_ENV === "production") {
      this.transporter = nodemailer.createTransport(sparkPostTransporter({
        Authorization: 'ae28b464c1a73d51dd34bb2828d72e3bbe897987',
        endpoint: 'https://api.eu.sparkpost.com/api/v1'
      }))
    }else {
      this.transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1e2d7f68422685",
          pass: "72bfea979f235b"
        }
      });
    }
  }

  async sendEmailVerification(options) {
    console.log('from: ', this.from);
    console.log('to: ', options.to);
    console.log('username: ', options.username);
    console.log(`url: https://${ options.host }/users/email-verification/${ options.userId }/${ options.token } `)
    try{
      const email = {
        from: this.from,
        subject: 'Email verification',
        to: options.to,
        html: pug.renderFile(path.join(__dirname, "templates/email-verification.pug"), {
          username: options.username,
          url: `https://${ options.host }/users/email-verification/${ options.userId }/${ options.token }`
        })
      };
      const response = await this.transporter.sendMail(email);
      console.log('response( send mail response): ',response);
    }catch(e){
      throw e;
    }
  }

  async sendResetPasswordLink(options) {
    try{
      const email = {
        from: this.from,
        subject: 'Password reset',
        to: options.to,
        html: pug.renderFile(path.join(__dirname, "templates/password-reset.pug"), {
          url: `https://${ options.host }/users/reset-password/${ options.userId }/${ options.token }`
        })
      };
      const response = await this.transporter.sendMail(email);
      console.log(response);
    }catch(e){
      throw e;
    }
  }

}

module.exports = new Email();
