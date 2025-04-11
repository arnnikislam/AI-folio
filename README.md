# Arnnik Islam Payel - Personal Portfolio

![Portfolio Preview](./public/assets/project-ss.jpg)

A modern, responsive personal portfolio website built with Next.js, Tailwind CSS, and Framer Motion. This portfolio showcases my skills, projects, and professional journey in an interactive and visually appealing way.

## Features

- **Modern UI/UX Design**: Clean, professional interface with attention to detail and aesthetics
- **Responsive Design**: Works seamlessly on all devices (mobile, tablet, desktop)
- **Dark/Light Mode**: Toggle between themes with smooth transitions and persistent state
- **Interactive Animations**: Powered by Framer Motion for engaging user experience
- **Next.js App Router**: Modern routing with Next.js 14 for optimal performance
- **Type Safety**: Built with TypeScript for robust code quality
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **Dynamic Content**: Easily updateable content through structured data files
- **Contact Form**: EmailJS integration for sending messages without a backend
- **Social Media Integration**: Links to all professional profiles and platforms
- **SEO Optimized**: Properly structured for search engine visibility
- **Fast Loading**: Optimized assets and code splitting for quick page loads
- **Accessibility**: Designed with accessibility considerations
- **Custom Theme Colors**: Tailored color scheme with gradient effects

## Sections

- **Home**: Interactive introduction with animated elements and quick navigation
- **About**: Personal information, background, and professional summary
- **Skills**: Technical skills and areas of expertise with visual representation
- **Education**: Academic background and qualifications with timeline
- **Projects**: Showcase of personal projects with details and live links
- **Resume**: Downloadable resume and professional experience summary
- **Testimonials**: Feedback and recommendations from colleagues and clients
- **Contact**: Interactive contact form and social media presence
- **Showcase**: Additional accomplishments, certificates, and recognition

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arnnikislam/my-portfolio.git
   cd my-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure EmailJS (for contact form):
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Create a service and email template
   - Update the service ID, template ID, and user ID in `src/app/contact/page.tsx`

4. Add your assets:
   - Place your profile picture at `public/assets/profile.jpg`
   - Place your resume at `public/assets/resume.pdf`
   - Add project images to `public/assets/projects/`

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

```bash
npm run build
# or
yarn build
```

### Deployment

This project is optimized for deployment on Vercel:

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Deploy

## Customization

- Update personal information in `src/data/personalInfo.ts`
- Modify education details in `src/data/education.ts`
- Edit skills in `src/data/skills.ts`
- Update projects in `src/data/projects.ts`
- Add testimonials in `src/data/testimonials.ts`
- Customize theme colors in `tailwind.config.js`

## Project Structure

```
my-portfolio/
├── public/            # Static assets
│   └── assets/        # Images and downloadable files
├── src/
│   ├── app/           # Next.js app router pages
│   ├── components/    # Reusable UI components
│   ├── data/          # Content data files
│   ├── styles/        # Global styles
│   ├── types/         # TypeScript type definitions
│   └── utils/         # Utility functions
├── tailwind.config.js # Tailwind configuration
├── next.config.js     # Next.js configuration
└── tsconfig.json      # TypeScript configuration
```

## Key Technologies

- [Next.js](https://nextjs.org/) - React framework for production
- [React](https://reactjs.org/) - UI component library
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [EmailJS](https://www.emailjs.com/) - Client-side email sending
- [React Icons](https://react-icons.github.io/react-icons/) - Icon library
- [next-themes](https://github.com/pacocoursey/next-themes) - Theme management
- [React Slick](https://react-slick.neostack.com/) - Carousel component
- [Chart.js](https://www.chartjs.org/) - Data visualization
- [React CountUp](https://github.com/glennreyes/react-countup) - Animated counters
- [React Intersection Observer](https://github.com/thebuilder/react-intersection-observer) - Scroll animations

## Performance Optimizations

- Image optimization with Next.js Image component
- Code splitting and lazy loading for faster initial load
- Server-side rendering for improved SEO
- Font optimization with system fonts
- Efficient asset loading strategies

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Profile content sourced from [Arnnik Islam's GitHub](https://github.com/arnnikislam)
- Design inspiration from modern portfolio trends
- Special thanks to the open-source community for the amazing tools that made this project possible

## Connect With Me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/arnnikislam)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@learnwitharnnik)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/arnnikislam)
