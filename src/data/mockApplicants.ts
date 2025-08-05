
export const mockApplicants = [
  {
    id: "app1",
    name: "Daniel Wong",
    email: "daniel.wong@email.com",
    phone: "(555) 456-7890",
    location: "Detroit, MI",
    stage: "Interview",
    jobTitle: "Manufacturing Engineer",
    appliedDate: "2024-01-20",
    source: "LinkedIn",
    skills: ["Lean Manufacturing", "CAD", "Process Optimization", "Quality Control"],
    experience: [
      {
        title: "Frontend Developer",
        company: "Tech Solutions Inc.",
        start: "2020-03",
        end: "Present"
      },
      {
        title: "Junior Developer",
        company: "Web Agency",
        start: "2018-06",
        end: "2020-02"
      }
    ],
    education: [
      {
        degree: "BS Computer Science",
        school: "University of California",
        year: "2018"
      }
    ],
    tags: ["React Expert", "Quick Response", "Strong Portfolio"],
    notes: [
      {
        author: "John Recruiter",
        date: "2023-08-16",
        content: "Had a great initial call. Very knowledgeable about React and modern frontend practices."
      }
    ],
    activity: [
      {
        title: "Phone Screening",
        description: "Completed 30-minute phone screening",
        date: "2023-08-16T14:30:00"
      },
      {
        title: "Application Received",
        description: "Applied for Senior Frontend Developer position",
        date: "2023-08-15T09:45:00"
      }
    ]
  },
  {
    id: "app2",
    name: "Eva Johnson",
    email: "eva.johnson@email.com",
    phone: "(555) 567-8901",
    location: "Portland, OR",
    stage: "Screening",
    jobTitle: "Frontend Developer",
    appliedDate: "2024-01-22",
    source: "Company Website",
    skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    experience: [
      {
        title: "Cloud Engineer",
        company: "Financial Services Corp",
        start: "2019-09",
        end: "Present"
      },
      {
        title: "Systems Administrator",
        company: "Tech Startup",
        start: "2017-05",
        end: "2019-08"
      }
    ],
    tags: ["AWS Certified", "Technical"],
    notes: [
      {
        author: "Lisa Hiring Manager",
        date: "2023-08-20",
        content: "Strong technical skills. Sent technical assessment to complete."
      }
    ],
    activity: [
      {
        title: "Technical Assessment",
        description: "Sent DevOps technical assessment",
        date: "2023-08-20T11:15:00"
      },
      {
        title: "Application Received",
        description: "Applied for DevOps Engineer position",
        date: "2023-08-14T13:20:00"
      }
    ]
  },
  {
    id: "app3",
    name: "Frank Müller",
    email: "frank.muller@email.com",
    phone: "(555) 678-9012",
    location: "Madison, WI",
    stage: "New",
    jobTitle: "Agricultural Analyst",
    appliedDate: "2024-01-28",
    source: "Indeed",
    skills: ["Data Analysis", "Agricultural Science", "GIS", "Statistical Modeling"],
    experience: [
      {
        title: "Associate Product Manager",
        company: "E-commerce Platform",
        start: "2021-01",
        end: "Present"
      },
      {
        title: "Product Analyst",
        company: "Software Solutions",
        start: "2019-03",
        end: "2020-12"
      }
    ],
    tags: ["Strong Communicator", "Leadership"],
    notes: [
      {
        author: "Mark Director",
        date: "2023-08-25",
        content: "Excellent fit for our team. Approved offer package."
      }
    ],
    activity: [
      {
        title: "Offer Preparation",
        description: "Preparing formal offer letter",
        date: "2023-08-25T15:30:00"
      },
      {
        title: "Final Interview",
        description: "Completed panel interview with leadership team",
        date: "2023-08-22T10:00:00"
      },
      {
        title: "Application Received",
        description: "Applied for Product Manager position",
        date: "2023-08-10T09:15:00"
      }
    ]
  },
  {
    id: "app-4",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 111-2222",
    location: "Chicago, IL",
    stage: "Screening",
    jobTitle: "Data Scientist",
    appliedDate: "2023-08-05",
    source: "LinkedIn",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    experience: [
      {
        title: "Junior Data Analyst",
        company: "Research Institution",
        start: "2020-06",
        end: "Present"
      }
    ],
    tags: ["Entry Level", "High Potential"],
    activity: [
      {
        title: "Application Received",
        description: "Applied for Data Scientist position",
        date: "2023-08-05T14:30:00"
      }
    ]
  },
  {
    id: "app-5",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    phone: "(555) 333-4444",
    location: "Seattle, WA",
    stage: "Applied",
    jobTitle: "Backend Developer",
    appliedDate: "2023-08-01",
    source: "Website",
    skills: ["Java", "Spring Boot", "MySQL", "Microservices"],
    activity: [
      {
        title: "Application Received",
        description: "Applied for Backend Developer position",
        date: "2023-08-01T16:45:00"
      }
    ]
  },
  {
    id: "app-6",
    name: "David Rodriguez",
    email: "david.r@example.com",
    phone: "(555) 555-6666",
    location: "Miami, FL",
    stage: "Interview",
    jobTitle: "UX Designer",
    appliedDate: "2023-07-25",
    source: "Indeed",
    skills: ["UI Design", "User Research", "Figma", "Prototyping"],
    activity: [
      {
        title: "Design Task",
        description: "Submitted design challenge",
        date: "2023-07-28T11:30:00"
      },
      {
        title: "Application Received",
        description: "Applied for UX Designer position",
        date: "2023-07-25T09:10:00"
      }
    ]
  },
  {
    id: "app-7",
    name: "Lisa Thompson",
    email: "lisa.t@example.com",
    phone: "(555) 777-8888",
    location: "Denver, CO",
    stage: "Hired",
    jobTitle: "Marketing Specialist",
    appliedDate: "2023-07-20",
    source: "Referral",
    skills: ["Content Marketing", "SEO", "Social Media", "Analytics"],
    activity: [
      {
        title: "Hired",
        description: "Accepted offer - starting on 09/01/2023",
        date: "2023-08-01T09:00:00"
      },
      {
        title: "Application Received",
        description: "Applied for Marketing Specialist position",
        date: "2023-07-20T13:45:00"
      }
    ]
  },
  {
    id: "app-8",
    name: "James Wilson",
    email: "james.w@example.com",
    phone: "(555) 999-0000",
    location: "Boston, MA",
    stage: "Rejected",
    jobTitle: "QA Engineer",
    appliedDate: "2023-07-15",
    source: "LinkedIn",
    skills: ["Manual Testing", "Automated Testing", "JIRA", "SQL"],
    activity: [
      {
        title: "Rejected",
        description: "Not a fit for current openings",
        date: "2023-07-25T16:30:00"
      },
      {
        title: "Application Received",
        description: "Applied for QA Engineer position",
        date: "2023-07-15T10:20:00"
      }
    ]
  }
];
