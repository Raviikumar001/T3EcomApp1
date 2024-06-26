# Create T3 App

Production link: https://t3-ecom-app1.vercel.app

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?



If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

**Getting started**
```
git clone 'repo name'
```
```
npm install

```
Generate and run the Prisma migration to create the tables in your database:

```
npx prisma migrate dev --name init
```




```
npm run prisma:seed
```
probably you'll be connecting to you own database, so seeding will put list of categories into you database

```
npm run dev
```
to start the web application
Also you'll need some additional env variables to work with

    DATABASE_URL: z.string().url(),
    USERID: z.string(),
    PASS: z.string(),
    JWT_SECRET: z.string(),
    HOST: z.string(),
USERID and PASS  are the crediantals for the mail server which you get after
regestering to https://mailtrap.io/
which I have used for sending mails
It has a decent limit

you can generate a secure JWT_SECRET online
DATABASE_URL- must be a postgresql connection url
For HOST is not req. probably if you using the test version for mail, 
if you using with a domain then probably you'll get the generated host from you dashboard in https://mailtrap.io/

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.
