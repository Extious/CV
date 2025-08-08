export interface CVData {
  personalInfo: {
    name: string;
    phone: string;
    email: string;
    website: string;
  };
  summary: string;
  education: {
    degree: string;
    school: string;
    period: string;
    gpa: string;
    details: string[];
  };
  honors: {
    title: string;
    year: string;
  }[];
  research: {
    title: string;
    description: string;
  }[];
  projects: {
    title: string;
    description: string;
  }[];
  skills: {
    technical: string[];
    languages: string[];
    activities: string[];
  };
}

export const cvData: CVData = {
  personalInfo: {
    name: "Zhao Zhan",
    phone: "15225929727",
    email: "zhaozhan@hust.edu.cn",
    website: "zhaozhan.site"
  },
  summary: "Graduate student focusing on Electronic Information Engineering with strong background in software and communication systems.",
  education: {
    degree: "Electronic Information Engineering (2+2 Program)",
    school: "Huazhong University of Science and Technology",
    period: "2022 - Present",
    gpa: "Overall GPA: 8.32",
    details: [
      "Selected Courses:",
      "C Programming: 91, Network Systems: 90",
      "Computer Networks: 94, Communication Principles: 89"
    ]
  },
  honors: [
    { title: "China Computer Design Competition Central South Second Prize", year: "2024" }
  ],
  research: [
    {
      title: "Connected Vehicle Application Design",
      description: "Designed a monitoring and rescue system with distributed architecture, improving reliability and scalability."
    },
    {
      title: "Realtime Communication with Golang",
      description: "Implemented WebSocket based realtime services with MySQL and Redis for persistence."
    },
    {
      title: "OvarianGPT: AI-driven Diagnosis",
      description: "Built a medical assistant using RAG and LangChain to support clinical decision making."
    },
    {
      title: "Survival Prognosis of Ovarian Cancer",
      description: "Developed ML models for prognosis prediction; results published at IEEE Healthcom."
    }
  ],
  projects: [
    { title: "Magnetic Navigation Simulator in C", description: "Built an interactive console game in C." },
    { title: "Web Management System", description: "Developed a distributed KV store in Rust and Go: tmykv." }
  ],
  skills: {
    technical: ["Golang", "Python"],
    languages: ["English (CET-6)"],
    activities: ["Personal Website: zhaozhan.site"]
  }
};
