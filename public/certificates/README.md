# Certificate Files Directory

This directory contains your certificate files organized for easy management and updates.

## 📁 Directory Structure:

```
/public/certificates/
├── images/          # Certificate preview images (for display)
├── pdfs/           # Certificate PDF files (for download)
└── README.md       # This file
```

## 🖼️ Certificate Images (`/images/`)
Place certificate preview images here for display on your portfolio:
- **Format**: .jpg, .jpeg, .png, .webp
- **Recommended Size**: 800x600px or similar aspect ratio
- **Naming**: Use descriptive names matching your certificates

**Example files:**
- `chatgpt-prompt-engineering.jpg`
- `fullstack-web-development.png`
- `aws-devops-getting-started.jpg`

## 📄 Certificate PDFs (`/pdfs/`)
Place the actual certificate PDFs here for download functionality:
- **Format**: .pdf (preferred) or high-quality images
- **Naming**: Use the same base name as images for consistency

**Example files:**
- `chatgpt-prompt-engineering.pdf`
- `fullstack-web-development.pdf`
- `aws-devops-getting-started.pdf`

## 🔄 Current Certificate Files Expected:

### 1. ChatGPT Prompt Engineering Mastery
- **Image**: `/certificates/images/chatgpt-prompt-engineering.jpg`
- **PDF**: `/certificates/pdfs/chatgpt-prompt-engineering.pdf`

### 2. Full-Stack Web Development Bootcamp
- **Image**: `/certificates/images/fullstack-web-development.jpg`
- **PDF**: `/certificates/pdfs/fullstack-web-development.pdf`

### 3. AWS DevOps Getting Started
- **Image**: `/certificates/images/aws-devops-getting-started.jpg`
- **PDF**: `/certificates/pdfs/aws-devops-getting-started.pdf`

## ⚙️ How to Update Certificate Data:

1. **Add Files**: Place image and PDF in respective folders
2. **Update Paths**: Modify `/lib/certificationData.ts`:
   ```typescript
   image: '/certificates/images/your-certificate.jpg',
   downloadUrl: '/certificates/pdfs/your-certificate.pdf',
   ```
3. **Auto-Sync**: Changes will automatically appear on both homepage and certificates page

## 📝 Naming Convention:
- Use lowercase letters
- Replace spaces with hyphens
- Keep names descriptive but concise
- Match image and PDF names (except extension)

Example: "AWS Solutions Architect" → `aws-solutions-architect.jpg` & `aws-solutions-architect.pdf`