// Generates a Word document (DOCX) for the ReCircle project report
// Uses the 'docx' library and embeds screenshots if present

const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  AlignmentType,
  TextRun,
  Media,
  Table,
  TableRow,
  TableCell,
} = require('docx');

function H(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({ text, heading: level });
}

function P(text, opts = {}) {
  return new Paragraph({
    alignment: opts.alignment || AlignmentType.LEFT,
    children: [new TextRun({ text, bold: !!opts.bold, italics: !!opts.italics })],
  });
}

function Center(text, bold = false) {
  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [new TextRun({ text, bold })],
  });
}

function CodeBlock(code) {
  // simple monospace paragraph for code
  return new Paragraph({
    children: [
      new TextRun({ text: code, font: "Courier New" }),
    ],
  });
}

function SectionDivider() {
  return new Paragraph({ children: [new TextRun({ text: "\n" })] });
}

function listScreenshots(screenshotsDir) {
  if (!fs.existsSync(screenshotsDir)) return [];
  const files = fs
    .readdirSync(screenshotsDir)
    .filter((f) => f.endsWith('.png'))
    .map((f) => path.join(screenshotsDir, f));
  return files;
}

async function build() {
  const doc = new Document({
    creator: "ReCircle Report Generator",
    title: "ReCircle – A Web Platform for Recycling and Reuse",
    description: "Project report in Word format",
  });

  const children = [];

  // Cover Page
  children.push(Center("Project Report On", true));
  children.push(new Paragraph({ children: [new TextRun({ text: "\n" })] }));
  children.push(Center("ReCircle – A Web Platform for Recycling and Reuse", true));
  children.push(new Paragraph({ children: [new TextRun({ text: "\n\n\n" })] }));
  children.push(Center("Designed By:"));
  children.push(Center("[ACTION REQUIRED: Your Full Name and Roll Number]"));
  children.push(new Paragraph({ children: [new TextRun({ text: "\n" })] }));
  children.push(Center("Submitted To:"));
  children.push(Center("[ACTION REQUIRED: Your College/Mandal Name]"));
  children.push(Center("[ACTION REQUIRED: Your College Full Name, City]"));
  children.push(Center("(NAAC Accreditation, if any)"));
  children.push(new Paragraph({ children: [new TextRun({ text: "\n" })] }));
  children.push(Center("In the partial fulfillment of"));
  children.push(Center("B.Sc. Computer Science"));
  children.push(new Paragraph({ children: [new TextRun({ text: "\n" })] }));
  children.push(Center("Under Guidance of:"));
  children.push(Center("[ACTION REQUIRED: Your Guide's Name and Designation]"));
  children.push(new Paragraph({ children: [new TextRun({ text: "\n" })] }));
  children.push(Center("Through:"));
  children.push(Center("THE HEAD,"));
  children.push(Center("DEPARTMENT OF COMPUTER SCIENCE,"));
  children.push(Center("[ACTION REQUIRED: Your College Name, City]"));
  children.push(new Paragraph({ children: [new TextRun({ text: "\n" })] }));
  children.push(Center("PROJECT REPORT"));
  children.push(Center("2025"));

  // Declaration
  children.push(SectionDivider());
  children.push(H("Declaration"));
  children.push(P("To,"));
  children.push(P("The Head,"));
  children.push(P("Department of Computer Science,"));
  children.push(P("[ACTION REQUIRED: Your College Name, City]."));
  children.push(SectionDivider());
  children.push(P("Respected Sir,"));
  children.push(
    P(
      'I, the undersigned, hereby declare that the project on "ReCircle – A Web Platform for Recycling and Reuse" is developed under the guidance of our lecturer [ACTION REQUIRED: Your Guide\'s Name].'
    )
  );
  children.push(P("The conclusion in this report is based on the data which is collected by me."));
  children.push(
    P(
      "I am declaring that this is my original work. I have not copied any materials related to my project. I do undersign that if my work is found to be copied, then I am liable to punishment as per the university rule."
    )
  );
  children.push(P("DATE:"));
  children.push(P("PLACE: [Your City]"));
  children.push(P("([ACTION REQUIRED: Your Full Name])"));

  // Certificate
  children.push(SectionDivider());
  children.push(H("Certificate"));
  children.push(P("[ACTION REQUIRED: Your College/Mandal Name]"));
  children.push(P("[ACTION REQUIRED: Your College Full Name, City]"));
  children.push(P("(NAAC Accreditation, if any)"));
  children.push(SectionDivider());
  children.push(P("CERTIFICATE", { bold: true }));
  children.push(
    P(
      "This is to certify that [ACTION REQUIRED: Your Full Name] has satisfactorily carried out their project work entitled:"
    )
  );
  children.push(P("ReCircle – A Web Platform for Recycling and Reuse", { bold: true }));
  children.push(
    P(
      "As per the syllabus prescribed for B.Sc. Computer Science of [Your University Name]. It is also certified that this is their own work completed during the academic year 2025. The work done is satisfactory and is presented as per the specifications."
    )
  );
  children.push(P("Project Guide"));
  children.push(P("External Examiner"));
  children.push(P("Head of Department"));
  children.push(P("DATE:"));

  // Acknowledgement
  children.push(SectionDivider());
  children.push(H("Acknowledgement"));
  children.push(
    P(
      "It's my great pleasure to get this opportunity and sincerely thank all the people who have helped me create a successful project."
    )
  );
  children.push(
    P(
      "I would like to thank my project guide, [ACTION REQUIRED: Your Guide's Name], who provided important information and guided me throughout the project completion."
    )
  );
  children.push(
    P(
      "And last but not the least! I would like to thank all my classmates and the open-source community for the tools and libraries used in this project."
    )
  );
  children.push(P("Thank You."));
  children.push(P("[ACTION REQUIRED: Your Full Name]"));

  // Index
  children.push(SectionDivider());
  children.push(H("Index", HeadingLevel.HEADING_2));
  children.push(
    P(
      "Sr. No. | Chapter No. | Title\n1. I Acknowledgment\n2. II Synopsis of the Project\n3. III Main Report - Objective & Scope of the Project - Theoretical Background - Survey of Literature - Research Analysis and Design - System Planning (Gantt Chart) - Details of Hardware & Software - Detailed Life Cycle of the Project - Data Flow Diagram (DFD) - ER Diagram - Activity Diagram - Class Diagram - Object Diagram - Use Case Diagram - Input and Output Screen Design - Methodology used for testing - Test case & Reports - Code of the Project\n4. IV Annexure (List of Tables)\n5. V Conclusion\n6. VI Future Enhancement\n7. VII References & Bibliography"
    )
  );

  // CHAPTER II: Synopsis
  children.push(SectionDivider());
  children.push(H("CHAPTER II: Synopsis of the Project", HeadingLevel.HEADING_2));
  children.push(H("ReCircle – A Web Platform for Recycling and Reuse", HeadingLevel.HEADING_3));
  children.push(H("Problem Statement", HeadingLevel.HEADING_4));
  children.push(
    P(
      "Household and office items often end up as waste; there is a need for a simple, centralized platform to facilitate reuse and donation, promoting a circular economy."
    )
  );
  children.push(H("Objective & Scope", HeadingLevel.HEADING_4));
  children.push(P("- Accurate Item Listing: Provide a platform for users to list items with details and images."));
  children.push(P("- Time Efficiency: Enable quick discovery via search, filtering, and pagination."));
  children.push(P("- Secure Access: Provide authentication and user profiles."));
  children.push(P("- Real-time Management: Users can manage their listings and profile."));
  children.push(P("- Community Involvement: Connect people to give unused items a second life."));
  children.push(H("Process Description", HeadingLevel.HEADING_4));
  children.push(
    P(
      "The existing system is informal and fragmented (social groups, generic classified sites). Records of donations/exchanges are not tracked. As nearly everything can be managed online, ReCircle provides a dedicated platform with high security and a focused user experience so reuse is easy, fast, and effective."
    )
  );

  // CHAPTER III: Main Report
  children.push(SectionDivider());
  children.push(H("CHAPTER III: Main Report", HeadingLevel.HEADING_2));
  children.push(H("Objective and Scope", HeadingLevel.HEADING_3));
  children.push(P("- Accurate Item Listing: Title, description, category, images, status."));
  children.push(P("- Time Efficiency: Centralized catalogue, search, filters, pagination."));
  children.push(P("- Real-time Management: Create/edit/delete own items; profile management."));
  children.push(P("- Reporting and Analytics (Future Scope): Insights into reuse trends."));
  children.push(P("- Community Involvement: Enables direct contact for pickup/exchange."));

  children.push(H("Theoretical Background", HeadingLevel.HEADING_3));
  children.push(P("- Circular Economy: Shift from take-make-dispose to reduce-reuse-recycle."));
  children.push(P("- Web Application Architecture: MERN stack (MongoDB, Express, React, Node)."));
  children.push(P("- Data Management: Mongoose schemas ensure consistency and query efficiency."));
  children.push(P("- Security: JWT-based auth, protected routes, CORS."));
  children.push(P("- Behavior Change: Lowering friction for donating/receiving promotes sustainable habits."));

  children.push(H("Survey of Literature", HeadingLevel.HEADING_3));
  children.push(P("- Reuse/Donation Platforms: Freecycle, Facebook Marketplace, OLX."));
  children.push(P("- Gap: Lack of structured, impact-focused, dedicated reuse platform for communities."));

  children.push(H("Research Analysis and Design", HeadingLevel.HEADING_3));
  children.push(H("Functional Requirements", HeadingLevel.HEADING_4));
  children.push(P("- User Authentication: Registration, login, JWT-based sessions."));
  children.push(P("- Item Management: Create, edit, delete own items; upload images; manage status."));
  children.push(P("- Browsing/Search: Public item catalogue; keyword, category."));
  children.push(P("- Protected Routes: Item creation/edit requires auth."));
  children.push(P("- Profile: View/update profile."));

  children.push(H("Non-Functional Requirements", HeadingLevel.HEADING_4));
  children.push(P("- Usability: Responsive UI with React and Material UI."));
  children.push(P("- Reliability: Robust DB connection; error handling; backend readiness."));
  children.push(P("- Security: JWT, server-side validation, sanitized inputs, CORS."));
  children.push(P("- Performance: Pagination and indexed queries."));
  children.push(P("- Portability: Vercel + Render deployment."));

  children.push(H("System Architecture", HeadingLevel.HEADING_3));
  children.push(P("- Client: React + MUI + react-router-dom + axios."));
  children.push(P("- API: Express REST endpoints; error middleware."));
  children.push(P("- Database: MongoDB via Mongoose."));
  children.push(P("- Auth: JWT tokens; protect middleware; optional admin."));
  children.push(P("- Storage: Cloudinary (future)."));
  children.push(P("- Deployment: Frontend on Vercel (/frontend), backend on Render (/backend)."));

  children.push(H("System Planning (Gantt Chart)", HeadingLevel.HEADING_3));
  children.push(P("[ACTION REQUIRED: Provide timeline months/ranges for each phase]"));
  children.push(P("- Preliminary Investigation: [Start–End]"));
  children.push(P("- System Analysis: [Start–End]"));
  children.push(P("- System Design: [Start–End]"));
  children.push(P("- System Coding: [Start–End]"));
  children.push(P("- Testing & Implementation: [Start–End]"));

  children.push(H("Details of Hardware & Software used", HeadingLevel.HEADING_3));
  children.push(H("Hardware Requirements", HeadingLevel.HEADING_4));
  children.push(P("[ACTION REQUIRED: Provide minimum specs, e.g., CPU, RAM, Disk Space]"));
  children.push(H("Software Requirements", HeadingLevel.HEADING_4));
  children.push(P("- OS: Windows/macOS/Linux; Node.js v18+; MongoDB"));
  children.push(P("- Frontend: react, @mui/material, axios, react-router-dom"));
  children.push(P("- Backend: express, mongoose, jsonwebtoken, bcryptjs, cors, dotenv"));

  children.push(H("Detailed Life Cycle of the Project", HeadingLevel.HEADING_3));
  children.push(P("Model: Iterative and Incremental; short iterations deliver usable features with early testing."));

  children.push(H("Data Flow Diagrams (DFDs)", HeadingLevel.HEADING_3));
  children.push(P("Zero Level DFD: User <-> ReCircle API <-> Database"));
  children.push(P("First Level DFD: User Management, Item Management, Search/Filter"));

  children.push(H("Entity-Relationship Diagram (ERD)", HeadingLevel.HEADING_3));
  children.push(P("Entities: User (1) — (N) Item"));

  children.push(H("Activity Diagram", HeadingLevel.HEADING_3));
  children.push(P("[ACTION REQUIRED: Provide concrete flows]"));
  children.push(P("- User: Register/Login -> Browse Items -> Create Item -> Manage Items -> Logout"));
  children.push(P("- Admin: Login -> Manage Users/Items -> Logout"));

  children.push(H("Class & Object Diagrams", HeadingLevel.HEADING_3));
  children.push(P("[ACTION REQUIRED: Can be generated from Mongoose schemas]"));

  children.push(H("Use Case Diagram (textual)", HeadingLevel.HEADING_3));
  children.push(P("User: Register, Login, View Items, Search, Create Item, Edit, Delete, Update Profile"));
  children.push(P("Admin: Login, Manage Users, Manage Items, View Metrics"));

  children.push(H("Input and Output Screen Design (Screenshots)", HeadingLevel.HEADING_3));
  const screenshotsDir = path.join(__dirname, '..', 'frontend', 'screenshots');
  const screenshots = listScreenshots(screenshotsDir);
  if (screenshots.length) {
    for (const f of screenshots) {
      try {
        const img = Media.addImage(doc, fs.readFileSync(f), 800);
        children.push(new Paragraph({ children: [img] }));
        children.push(P(path.basename(f)));
      } catch (e) {
        children.push(P(`Failed to embed ${path.basename(f)}: ${e.message}`));
      }
    }
  } else {
    children.push(P("[No screenshots found. Run the screenshot script to generate them.]"));
  }

  children.push(H("Methodology used for testing", HeadingLevel.HEADING_3));
  children.push(P("Manual Testing: requirement-based test design, positive/negative paths, regression, responsiveness checks."));

  children.push(H("Test Cases & Reports", HeadingLevel.HEADING_3));
  children.push(P("1. User Login (valid) – Passed"));
  children.push(P("2. User Login (invalid) – Passed"));
  children.push(P("3. Create Item (authenticated) – Passed"));
  children.push(P("4. Search by keyword – Passed"));

  children.push(H("Code of the Project (extract)", HeadingLevel.HEADING_3));
  children.push(P("Backend Middleware: authMiddleware.js"));
  const code = `const jwt = require('jsonwebtoken');\nconst asyncHandler = require('express-async-handler');\nconst User = require('../models/User.js');\n\nconst protect = asyncHandler(async (req, res, next) => {\n  let token;\n  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {\n    token = req.headers.authorization.split(' ')[1];\n  } else if (req.cookies && req.cookies.token) {\n    token = req.cookies.token;\n  }\n  if (!token) {\n    res.status(401);\n    throw new Error('Not authorized, no token');\n  }\n  try {\n    const decoded = jwt.verify(token, process.env.JWT_SECRET);\n    req.user = await User.findById(decoded.id).select('-password');\n    if (!req.user) {\n      res.status(401);\n      throw new Error('Not authorized, user not found');\n    }\n    next();\n  } catch (error) {\n    console.error(error);\n    res.status(401);\n    throw new Error('Not authorized, token failed');\n  }\n});\n\nconst admin = (req, res, next) => {\n  if (req.user && req.user.isAdmin) {\n    next();\n  } else {\n    res.status(403);\n    throw new Error('Not authorized as an admin');\n  }\n};\n\nmodule.exports = { protect, admin };`;
  children.push(CodeBlock(code));

  // Annexure
  children.push(SectionDivider());
  children.push(H("CHAPTER IV: Annexure", HeadingLevel.HEADING_2));
  children.push(H("List of Tables (Schemas)", HeadingLevel.HEADING_3));
  children.push(P("User: name, email, password, isAdmin, timestamps"));
  children.push(P("Item: owner, title, description, category, images, status, timestamps"));

  // Conclusion
  children.push(SectionDivider());
  children.push(H("CHAPTER V: Conclusion", HeadingLevel.HEADING_2));
  children.push(P("ReCircle addresses the need for a dedicated system for reuse and recycling, streamlining donations and exchanges while fostering community engagement and environmental responsibility."));

  // Future Enhancement
  children.push(SectionDivider());
  children.push(H("CHAPTER VI: Future Enhancement", HeadingLevel.HEADING_2));
  children.push(P("- Image Uploads via Cloudinary"));
  children.push(P("- Role-based Access Control (Admin)"));
  children.push(P("- Real-time Notifications/Messaging"));
  children.push(P("- Impact Analytics Dashboard"));
  children.push(P("- Mobile Application"));

  // References
  children.push(SectionDivider());
  children.push(H("CHAPTER VII: References & Bibliography", HeadingLevel.HEADING_2));
  children.push(P("React: https://react.dev/"));
  children.push(P("Material UI: https://mui.com/"));
  children.push(P("Express.js: https://expressjs.com/"));
  children.push(P("MongoDB/Mongoose: https://mongoosejs.com/"));
  children.push(P("JSON Web Tokens: https://jwt.io/"));

  doc.addSection({ children });

  const outDir = path.join(__dirname);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'ReCircle_Project_Report.docx');

  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buffer);
  console.log('DOCX generated at:', outPath);
}

build().catch((e) => {
  console.error('Failed to generate DOCX:', e);
  process.exit(1);
});
