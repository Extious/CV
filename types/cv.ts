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

export const cvDataEn: CVData = {
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

export const cvDataZh: CVData = {
  personalInfo: {
    name: "赵展",
    phone: "15225929727",
    email: "zhaozhan@hust.edu.cn",
    website: "zhaozhan.site"
  },
  summary: "电子信息工程方向研究生，具备良好的软件与通信系统背景。",
  education: {
    degree: "电子信息工程（2+2 项目）",
    school: "华中科技大学",
    period: "2022 - 至今",
    gpa: "总成绩绩点：8.32",
    details: [
      "高分课程：",
      "C 程序设计：91，网络系统：90",
      "计算机网络：94，通信原理：89"
    ]
  },
  honors: [
    { title: "中国计算机设计大赛中南赛区二等奖", year: "2024" }
  ],
  research: [
    {
      title: "车联网应用设计",
      description: "设计分布式架构的监听与救援系统，提升可靠性与可扩展性。"
    },
    {
      title: "Golang 实时通信服务",
      description: "基于 WebSocket 实现实时通信，使用 MySQL 与 Redis 做持久化。"
    },
    {
      title: "OvarianGPT 智能诊断",
      description: "基于 RAG 与 LangChain 的医疗助手，辅助临床决策。"
    },
    {
      title: "卵巢癌生存期预后预测",
      description: "构建机器学习预测模型，成果发表于 IEEE Healthcom。"
    }
  ],
  projects: [
    { title: "C 语言磁导航模拟器", description: "基于 C 语言开发交互式控制台游戏。" },
    { title: "Web 管理系统", description: "使用 Rust 与 Go 开发分布式 KV 存储 tmykv。" }
  ],
  skills: {
    technical: ["Golang", "Python"],
    languages: ["英语（CET-6）"],
    activities: ["个人网站：zhaozhan.site"]
  }
};
