export interface CVData {
  personalInfo: {
    name: string;
    phone: string;
    email: string;
    website: string;
    avatar: string;
  };
  objective: string;
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

export const cvDataZh: CVData = {
  personalInfo: {
    name: "赵展",
    phone: "15225929727",
    email: "zhaozhan@hust.edu.cn",
    website: "zhaozhan.site",
    avatar: "/myself.JPG"
  },
  objective: "香港科技大学博士生预录取批次",
  education: {
    degree: "电子信息工程专硕研究生（2+2）大三在读，大一大二在软件学院，大三转入电信学院，现任Dian团队算法学科组组长",
    school: "华中科技大学",
    period: "电子信息工程（基于项目导向实践专业实验教学2+2（硕博班））202210级 电子信息与通信学院",
    gpa: "总分绩点：8.32",
    details: [
      "高分课程：",
      "软件学院（大一大二）：C程序设计基础：91 网络系统设计与实践：90",
      "电信学院（大三）：计算机网络：94 通信原理：89"
    ]
  },
  honors: [
    {
      title: "中国计算机设计大赛中南地区二等奖（7万份参赛作品）",
      year: "2024"
    }
  ],
  research: [
    {
      title: "Dian团队：车联网应用设计",
      description: "本项目设计开发了一款监听-救援动态系统应用程序，整个项目通过智能系统分布式架构，实现产品优化、条件奖励等功能，通过分布式程序架构实现专业的运输物流系统。"
    },
    {
      title: "使用Golang进行开发，运用WebSocket实现实时通信，运用MySQL和Redis数据库进行数据存储和活动存储。",
      description: ""
    },
    {
      title: "OvarianGPT：面向卵巢癌智能诊断应用设计",
      description: "本项目针对智慧医疗软件问题，基于'医疗顾问'系统开发智能诊断工具，利用RAG检索增强生成技术和Langchain框架，提供实用性医疗诊断工具，为医生和患者提供专业的诊断支持。"
    },
    {
      title: "利用RAG技术和Langchain对医疗数据进行检索增强，提供智能化的医疗诊断支持系统。",
      description: ""
    },
    {
      title: "Predicting the Survival Prognosis of Ovarian Cancer Patients in a Broad Learning Approach",
      description: "该研究致力于卵巢癌患者生存期预后预测，采用机器学习方法进行生存期预测模型构建，研究成果已发表于IEEE Healthcom国际会议。"
    }
  ],
  projects: [
    {
      title: "使用C语言实现模拟磁导航系统",
      description: "使用C语言开发人机交互游戏"
    },
    {
      title: "基于jQuery的Web管理系统",
      description: "使用Rust和Golang开发分布式键值存储系统：tmykv"
    }
  ],
  skills: {
    technical: ["Golang", "Python开发经验"],
    languages: ["英语（CET-6）"],
    activities: ["个人网站：zhaozhan.site"]
  }
};

export const cvDataEn: CVData = {
  personalInfo: {
    name: "Zhao Zhan",
    phone: "15225929727",
    email: "zhaozhan@hust.edu.cn",
    website: "zhaozhan.site",
    avatar: "/myself.JPG"
  },
  objective: "PhD Pre-admission at Hong Kong University of Science and Technology",
  education: {
    degree: "Master's in Electronic Information Engineering (2+2 Project-oriented Practice Program), Junior Year, transferred from Software Engineering to Electronic Information Engineering, currently serving as Algorithm Team Leader in Dian Team",
    school: "Huazhong University of Science and Technology",
    period: "Electronic Information Engineering (Project-oriented Practice Teaching 2+2 Master-PhD Program) Starting 202210, School of Electronic Information and Communications",
    gpa: "Overall GPA: 8.32",
    details: [
      "Outstanding Course Grades:",
      "Software School (Freshman-Sophomore): C Programming Design: 91, Network System Design and Practice: 90",
      "Electronic Information School (Junior): Computer Networks: 94, Communication Principles: 89"
    ]
  },
  honors: [
    {
      title: "Second Prize in China Computer Design Competition Central South Region (70,000 participants)",
      year: "2024"
    }
  ],
  research: [
    {
      title: "Dian Team: Connected Vehicle Internet Application Design",
      description: "This project designed and developed a monitoring-rescue glucose dynamic system application, ensuring program design through intelligent water system distribution, product improvement, conditional rewards, and new communication channels."
    },
    {
      title: "Developed using Golang, implemented real-time communication using WebSocket, used MySQL and Redis databases for data storage and activity storage.",
      description: ""
    },
    {
      title: "OvarianGPT: AI-driven Ovarian Cancer Diagnosis Application",
      description: "This project addresses smart city software issues through the 'Duan Advisor' system, utilizing RAG retrieval learning methods and Langchain technology for enhanced user experience."
    },
    {
      title: "Predicting the Survival Prognosis of Ovarian Cancer Patients in a Broad Learning Approach",
      description: "Research focused on survival prognosis prediction for ovarian cancer patients using machine learning approaches. Paper published in IEEE Healthcom."
    }
  ],
  projects: [
    {
      title: "Simulated Magnetic Navigation System using C",
      description: "Developed a human-machine interactive game using C programming language"
    },
    {
      title: "Web-based Management System using jQuery",
      description: "Developed a distributed key-value storage system using Rust and Golang: tmykv"
    }
  ],
  skills: {
    technical: ["Golang", "Python Development"],
    languages: ["English (CET-6)"],
    activities: ["Personal Website: zhaozhan.site"]
  }
};
