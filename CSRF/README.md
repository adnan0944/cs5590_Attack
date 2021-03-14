This repository contains a sample web application with Cross-Site Request Forgery (CSRF) vulnerabilities and its attacker website.

The application is used to explain how CSRF attacks work and how to fix those vulnerabilities in the article [Prevent Cross-Site Request Forgery (CSRF) Attacks](https://auth0.com/blog/cross-site-request-forgery-csrf/)

---
### Technology

This project uses the following technologies:

-  [Node.js](https://nodejs.org/)

### Running the Application

To run this project, follow these steps:

1. Move to the root folder of the project (`CSRF`) in your machine and install the dependencies by running the following command:

   ```shell
   npm install
   ```

2. To launch the web application, run the following command:

   ```shell
   npm start
   ```

3. Point your browser to [http://localhost:3000](http://localhost:3000) to access the sample web app.

4. To launch the attacker website, run the following command:

   ```shell
   node attacker-server.js
   ```

5. Point your browser to [http://localhost:4000](http://localhost:4000/) to access the attacker website
