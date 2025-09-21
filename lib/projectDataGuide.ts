// Project Data Management Guide
// =============================
// 
// IMPORTANT: This is your SINGLE SOURCE OF TRUTH for all project data
// 
// To update project information:
// 1. Edit data in: /lib/projectData.ts
// 2. All components will automatically sync:
//    - Homepage Featured Projects section
//    - /projects page (All Projects Showcase)
//    - Any other component that imports this data
//
// Example: To update BuildMart project description:
// 1. Open /lib/projectData.ts
// 2. Find the BuildMart project object
// 3. Update the 'description' or any other field
// 4. Save the file
// 5. All pages automatically display the updated information
//
// To add a new project:
// 1. Add a new project object to the allProjects array in /lib/projectData.ts
// 2. Set 'featured: true' if you want it on homepage
// 3. Categories and years will automatically update in filters
//
// Data Structure:
// {
//   id: unique number,
//   title: "Project Name",
//   description: "Short description for cards",
//   longDescription: "Detailed description (optional)",
//   image: "/path-to-image.jpg",
//   technologies: ["Tech1", "Tech2", ...],
//   category: "Full-Stack" | "Frontend" | "Backend" | etc,
//   year: "2023",
//   featured: true | false,
//   status: "Live" | "In Development" | "Completed",
//   metrics: {
//     key1: "value1",
//     key2: "value2",
//     // Add as many metrics as needed
//   },
//   links: {
//     live: "https://demo-url.com",
//     github: "https://github.com/username/repo"
//   },
//   highlights: [
//     "Feature 1",
//     "Feature 2",
//     // Optional array of project highlights
//   ]
// }

import { allProjects, featuredProjects, categories, years } from './projectData'

console.log('=== PROJECT DATA SYNC VERIFICATION ===')
console.log('Total projects:', allProjects.length)
console.log('Featured projects:', featuredProjects.length)
console.log('Available categories:', categories)
console.log('Available years:', years)
console.log('=== SYNC COMPLETE ===')

export default function ProjectDataGuide() {
  return null // This is just a documentation file
}