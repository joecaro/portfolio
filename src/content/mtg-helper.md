---
slug: mtg-help
title: "MTG Help Me"
date: Sep 27 2024 12:00 AM
author: Joe
description: "Elevating the Magic: The Gathering Experience with AI. Chat PW: taptap"
stack:
    - NextJS
    - ReactJS
    - RadixUI
github: https://github.com/joecaro/mtg-helper
demo: https://mtg-helper-two.vercel.app/
tags:
    - reactjs
    - nextjs
    - tailwind
tech:
    - nextjs
    - reactjs
image: https://res.cloudinary.com/joecarothers/image/upload/v1727465712/misc/Projects/mtg-helper_e6o3nc.png
---
## MTG Help Me: Elevating the Magic: The Gathering Experience with AI

Magic: The Gathering (MTG) has been a staple in the world of strategy games for decades, captivating players with its deep mechanics, intricate strategies, and vast multiverse of lore. To enhance the player experience, I’ve developed **MTG Help Me**, an AI-powered companion app designed to assist players in navigating the complexities of Magic. Whether you're new to the game or a seasoned planeswalker, **MTG Help Me** offers advanced tools to guide you on your MTG journey.

In this post, I’ll walk you through the technical development of **MTG Help Me**, from the tech stack to the key features that make it a must-have for every MTG enthusiast.

If you'd like to check the app out -> [MTG Helper](https://mtg-helper-two.vercel.app/)

The chat feature is password protected so you'd have to at least come here to acces it first. The password is: `taptap`

## Project Overview

**MTG Help Me** is built on modern web development technologies, offering an array of features including an AI-powered chat, image generation, and a comprehensive MTG dictionary. The application provides responsive, secure access across devices, ensuring users can enjoy its benefits from any platform.

### Key Technologies

- **Next.js**: Utilized for its server-side rendering and static site generation capabilities, ensuring the app is fast and SEO-friendly.
- **Tailwind CSS**: Tailwind CSS allows for rapid and consistent UI development, providing flexibility while maintaining a clean codebase.
- **TypeScript**: Using TypeScript ensures better type safety and improved developer experience, making the app more maintainable and scalable.
- **React Query**: React Query simplifies server state management, providing a seamless experience for data fetching and syncing.
- **Radix UI**: A collection of accessible, customizable UI components that enhances the overall user interface design.

## Key Features

### 1. AI-Powered Chat

At the heart of **MTG Help Me** is the **Arcanis the Omnipotent Chat**, an AI-powered assistant that leverages OpenAI's GPT-4 model to help users with everything MTG-related. The chat provides advice on card synergies, deck-building strategies, official rulings, and even lore-based questions.

The core of the chat functionality is handled using the following integration:

```javascript
import OpenAI from 'openai'
import { NextResponse } from 'next/server'
import { systemMessage } from './systemMessage'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
 try {
  const { messages } = await req.json()

  const completion = await openai.chat.completions.create({
   model: 'gpt-4o-mini',
   messages: [
    {
     role: 'system',
     content: systemMessage,
    },
    ...messages.map((message: { role: string; content: string }) => ({
     role: message.role,
     content: message.content,
    })),
   ],
  })

  return NextResponse.json({
   message: completion.choices[0].message.content,
   completion: completion,
  })
 } catch (error: unknown) {
  console.error(`Error with OpenAI API request: ${error}`)
  return NextResponse.json(
   { error: 'An error occurred during your request.' },
   { status: 500 }
  )
 }
}
```

### 2. Image Generation

Using OpenAI's **DALL-E 3** model, the app enables users to generate custom images based on descriptions of cards, scenes, or other creative elements related to MTG. This feature is perfect for visualizing custom cards or moments in the game.

The API call to generate images is simple and effective:

```javascript
const image = await openai.images.generate({
 prompt: prompt,
 model: 'dall-e-3',
})
```

### 3. Comprehensive MTG Dictionary

The **MtgDictionary** component is a vital part of the app, providing users with access to a rich repository of MTG card details, mechanics, and lore. This dictionary ensures that players always have the resources they need at their fingertips, whether they’re exploring set mechanics or looking up card abilities.

### 4. Secure Access

For added privacy, **MTG Help Me** includes a password-protected section to safeguard sensitive information. This ensures that users can access protected content securely, without risking unauthorized access.

The integration of cookies allows for seamless access management:

```javascript
const cookieStore = cookies()
const password = cookieStore.get('password')
const correctPassword = process.env.SUPER_SECRET_PASSWORD

return (
   password?.value === correctPassword ? <ProtectedContent /> : <PasswordForm />
)
```

### 5. Responsive Design

**MTG Help Me** is designed to be fully responsive, ensuring an optimal user experience across devices, from desktops to mobile. By leveraging Tailwind CSS’s utility-first design, we crafted a responsive UI that adapts beautifully across different screen sizes.

```javascript
<Image
 src={backgroundImg}
 alt="Magic: The Gathering"
 placeholder="blur"
 fill
 sizes="100vw"
 className="object-cover"
/>
```

## Getting Started

Developers interested in contributing to the project can quickly get set up with the following steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/username/mtg-help-me.git
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env.local` file with the following:

   ```bash
   OPENAI_API_KEY=your-api-key
   SUPER_SECRET_PASSWORD=your-password
   ```

4. **Run the Development Server**:

   ```bash
   npm run dev
   ```

## Conclusion

**MTG Help Me** is an exciting project that combines cutting-edge AI technologies with the passion and complexity of Magic: The Gathering. By integrating tools like OpenAI's GPT-4 and DALL-E models, we’ve created a companion app that enhances the user’s MTG experience, making information and creativity easily accessible.

As an ongoing project, I’m excited to continue improving **MTG Help Me** and welcome contributions from the community. I hope this walkthrough has provided insight into the technical details and innovative features that make **MTG Help Me** a unique tool for MTG enthusiasts.

Feel free to check out the source code on GitHub and contribute to the project!

**GitHub Repository**: [https://github.com/username/mtg-help-me](https://github.com/username/mtg-help-me)
