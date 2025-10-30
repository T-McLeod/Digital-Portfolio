
import React from 'react';
import type { Project, Skill, ExperienceItem } from './types';

const iconClass = "h-8 w-8 text-sky-400";

export const SKILLS: Skill[] = [
  { name: 'React', icon: <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"></path><path d="M12 7c-2.757 0-5 2.243-5 5s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5zm0 8c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z"></path><path d="M12.012 2.5a9.48 9.48 0 0 0-7.012 3.257l1.42 1.417A7.485 7.485 0 0 1 12.012 4.5a7.502 7.502 0 0 1 7.493 7.493 7.49 7.49 0 0 1-2.65 5.673l1.42 1.417A9.492 9.492 0 0 0 21.5 11.993a9.51 9.51 0 0 0-9.488-9.493zM4.5 12.012a7.502 7.502 0 0 1 7.493-7.493 7.49 7.49 0 0 1 5.673 2.65l1.417-1.42A9.492 9.492 0 0 0 11.993 2.5a9.51 9.51 0 0 0-9.493 9.488 9.48 9.48 0 0 0 3.257 7.012l1.417-1.42A7.485 7.485 0 0 1 4.5 12.012z"></path></svg> },
  { name: 'TypeScript', icon: <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M19.333 2H4.667C3.194 2 2 3.194 2 4.667v14.666C2 20.806 3.194 22 4.667 22h14.666C20.806 22 22 20.806 22 19.333V4.667C22 3.194 20.806 2 19.333 2zM15 15.167h-3.333v-1h2.5V8.5H11.5v1H14v2.333h-2.333V14h-1v-4.333c0-.46.373-.834.833-.834h3.167c.46 0 .833.373.833.834v5.666c0 .46-.373.834-.833.834zm-5.5-2.001H8.667V11.5h.833v1.666z"></path></svg> },
  { name: 'Node.js', icon: <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M21.25,2.75H2.75v18.5h18.5V2.75z M12.871,19.309l-1.624-3.411l-0.089-0.187l-0.091,0.187l-1.579,3.411H7.13L11.2,11.214v-2.3H8.831V6.983h6.338v1.931h-2.368v2.3l4.038,8.095H12.871z"></path></svg> },
  { name: 'Tailwind CSS', icon: <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M12.001,4.529c1.31,0,2.427,0.453,3.374,1.355c0.947,0.902,1.421,2.04,1.421,3.414c0,1.373-0.473,2.511-1.421,3.414c-0.947,0.902-2.064,1.355-3.374,1.355c-1.31,0-2.427-0.453-3.374-1.355c-0.947-0.902-1.421-2.04-1.421-3.414c0-1.373,0.473-2.511,1.421-3.414C9.574,4.982,10.691,4.529,12.001,4.529z M18.001,12.98c1.31,0,2.427,0.453,3.374,1.355c0.947,0.902,1.421,2.04,1.421,3.414c0,1.373-0.473,2.511-1.421,3.414c-0.947,0.902-2.064,1.355-3.374,1.355c-1.31,0-2.427-0.453-3.374-1.355c-0.947-0.902-1.421-2.04-1.421-3.414c0-1.373,0.473-2.511,1.421-3.414C15.574,13.433,16.691,12.98,18.001,12.98z M6.001,12.98c1.31,0,2.427,0.453,3.374,1.355c0.947,0.902,1.421,2.04,1.421,3.414c0,1.373-0.473,2.511-1.421,3.414c-0.947,0.902-2.064,1.355-3.374,1.355c-1.31,0-2.427-0.453-3.374-1.355c-0.947-0.902-1.421-2.04-1.421-3.414c0-1.373,0.473-2.511,1.421-3.414C3.574,13.433,4.691,12.98,6.001,12.98z"></path></svg> },
  { name: 'Gemini API', icon: <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1.41 14.59L12 15.17l-1.41 1.42L9.17 18 12 15.17l2.83 2.83zM12 8.83l1.41-1.42L14.83 6 12 8.83 9.17 6 7.76 7.41z"></path></svg> },
  { name: 'Next.js', icon: <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M17,17h-2v-5l-3-3.35V17H9.5V7H12v5l3,3.35V7H17V17z"></path></svg> },
  { name: 'Figma', icon: <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M15.75,2H8.25C5.9,2,4,3.9,4,6.25v2.5C4,9.85,5.9,11.75,8.25,11.75h7.5C18.1,11.75,20,9.85,20,8.75v-2.5C20,3.9,18.1,2,15.75,2z M8.25,4.5h7.5c1.24,0,2.25,1.01,2.25,2.25v1.25c0,1.24-1.01,2.25-2.25,2.25h-7.5C7.01,10.25,6,9.24,6,8V6.75C6,5.51,7.01,4.5,8.25,4.5z M8.25,12.25H4V18c0,1.24,1.01,2.25,2.25,2.25h2V12.25z"></path></svg> },
  { name: 'Git & GitHub', icon: <svg xmlns="http://www.w3.org/2000/svg" className={iconClass} viewBox="0 0 24 24" fill="currentColor"><path d="M12,2C6.48,2,2,6.48,2,12c0,4.42,2.87,8.17,6.84,9.5c0.5,0.09,0.68-0.22,0.68-0.48c0-0.24-0.01-0.87-0.01-1.7c-2.78,0.6-3.37-1.34-3.37-1.34c-0.45-1.15-1.11-1.46-1.11-1.46c-0.91-0.62,0.07-0.6,0.07-0.6c1,0.07,1.53,1.03,1.53,1.03c0.89,1.53,2.34,1.09,2.91,0.83c0.09-0.65,0.35-1.09,0.63-1.34c-2.22-0.25-4.55-1.11-4.55-4.95c0-1.09,0.39-1.99,1.03-2.69c-0.1-0.25-0.45-1.27,0.1-2.65c0,0,0.84-0.27,2.75,1.02c0.79-0.22,1.65-0.33,2.5-0.33c0.85,0,1.71,0.11,2.5,0.33c1.91-1.29,2.75-1.02,2.75-1.02c0.55,1.38,0.2,2.4,0.1,2.65c0.64,0.7,1.03,1.6,1.03,2.69c0,3.85-2.34,4.7-4.57,4.94c0.36,0.31,0.68,0.92,0.68,1.85c0,1.34-0.01,2.42-0.01,2.74c0,0.27,0.18,0.57,0.69,0.48C19.13,20.17,22,16.42,22,12C22,6.48,17.52,2,12,2z"></path></svg> },
];

export const PROJECTS: Project[] = [
  {
    title: 'AI Cover Letter Generator',
    description: 'An interactive tool that leverages the Gemini API to generate personalized cover letters based on a user-provided job description. Showcases API integration and state management skills.',
    tags: ['React', 'TypeScript', 'Gemini API', 'Tailwind CSS'],
    imageUrl: 'https://picsum.photos/seed/ai-cover-letter/600/400',
    isAiFeature: true,
  },
  {
    title: 'E-commerce Platform',
    description: 'A full-featured e-commerce site with product catalogs, shopping cart, and a secure checkout process. Built with a focus on performance and user experience.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    imageUrl: 'https://picsum.photos/seed/ecommerce/600/400',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Data Visualization Dashboard',
    description: 'A responsive dashboard for visualizing complex datasets. Features interactive charts and graphs built with D3.js and Recharts, offering real-time data filtering.',
    tags: ['React', 'D3.js', 'Recharts', 'Redux'],
    imageUrl: 'https://picsum.photos/seed/dashboard/600/400',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    title: 'Project Management Tool',
    description: 'A collaborative Kanban-style project management application with drag-and-drop functionality, real-time updates, and user authentication.',
    tags: ['React', 'Firebase', 'Tailwind CSS', 'React DnD'],
    imageUrl: 'https://picsum.photos/seed/kanban/600/400',
    liveUrl: '#',
    githubUrl: '#',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
    {
        company: 'InnovateTech Solutions',
        role: 'Senior Frontend Engineer',
        period: 'Jan 2021 - Present',
        description: [
            'Led the development of a large-scale enterprise dashboard using React, TypeScript, and Redux, improving data processing speed by 30%.',
            'Mentored a team of 4 junior developers, conducting code reviews and promoting best practices in agile development.',
            'Architected and implemented a component library that standardized UI across all company products, reducing development time by 25%.',
            'Integrated the Gemini API for a new AI-powered analytics feature, which increased user engagement by 15%.',
        ],
    },
    {
        company: 'Creative Digital Agency',
        role: 'Frontend Developer',
        period: 'Jun 2018 - Dec 2020',
        description: [
            'Developed and maintained responsive websites and web applications for a diverse range of clients using React and Next.js.',
            'Collaborated with UI/UX designers to translate Figma mockups into pixel-perfect, interactive web pages.',
            'Improved website performance metrics, achieving a 20% reduction in load times by optimizing assets and implementing code-splitting.',
            'Wrote and maintained unit and integration tests using Jest and React Testing Library, ensuring high code quality and reliability.',
        ],
    },
    {
        company: 'Startup Hub Inc.',
        role: 'Junior Web Developer',
        period: 'Jul 2016 - May 2018',
        description: [
            'Assisted in building and maintaining client-facing websites using HTML, CSS, and JavaScript.',
            'Gained hands-on experience with the React ecosystem and modern frontend build tools like Webpack.',
            'Contributed to the development of a content management system, working on both front-end and back-end features.',
        ],
    },
];

export const PERSONAL_INFO = {
    name: 'Alex Doe',
    title: 'Senior Frontend Engineer',
    bio: 'I specialize in building exceptional digital experiences. With a passion for clean code and user-centric design, I turn complex problems into beautiful, intuitive, and highly performant web applications.',
    long_bio: 'As a seasoned frontend engineer with over 7 years of experience, I thrive on bridging the gap between design and technology. My expertise lies in the React ecosystem, TypeScript, and modern styling solutions like Tailwind CSS. I have a proven track record of leading projects from conception to launch, mentoring junior developers, and collaborating effectively in agile teams. I\'m always excited to explore new technologies and am currently fascinated by the possibilities of integrating generative AI into web applications to create smarter, more personalized user experiences.',
    email: 'alex.doe@example.com',
    linkedin: 'https://linkedin.com/in/alexdoe',
    github: 'https://github.com/alexdoe',
    twitter: 'https://twitter.com/alexdoe',
};
