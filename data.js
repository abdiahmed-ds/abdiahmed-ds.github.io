/* ==========================================
   PORTFOLIO DATA
   -------------------------------------------------
   Edit this file to update site content.
   ========================================== */

window.PORTFOLIO_DATA = {

  /* ---------- PERSONAL ---------- */
  personal: {
    name: "Abdirahman Ahmed",
    role: "Data Science Student",
    location: "Nairobi, Kenya",
    timezone: "EAT",
    email: "abdirahmanmoha608@gmail.com",
    linkedin: "https://www.linkedin.com/in/abdirahmanahmed-ds",
    github: "https://github.com/abdiahmed-ds", // <-- Fixed!
  },

  /* ---------- PROJECTS ---------- */
  projects: [
    {
      title: "Python for Data Science",
      description: "A series of Jupyter notebooks covering core Pandas skills — filtering DataFrames, dropping duplicates, using .isin() and unique(), and creating conditional columns.",
      tags: ["Python", "Pandas", "Jupyter"],
      url: "https://github.com/abdiahmed-ds/Python-For-Data-Science",
      featured: true,
      year: "2025",
      chart: "bar"
    },
    {
      title: "Churn Startup",
      description: "A machine learning project focused on predicting customer churn, helping businesses identify at-risk customers before they leave.",
      tags: ["Python", "Machine Learning"],
      url: "https://github.com/abdiahmed-ds/churn-startup",
      featured: false,
      year: "2025",
      chart: "line"
    },
    {
      title: "Excel Data Analysis",
      description: "Using advanced Excel functions and pivot tables to clean, analyze, and visualize raw datasets for business insights.",
      tags: ["Excel", "Data Analysis"],
      url: "https://github.com/abdiahmed-ds/Excel-Data-Analysis",
      featured: false,
      year: "2025",
      chart: "none"
    }
  ],

  /* ---------- NOTES ---------- */
  notes: [
    {
      date: "Planned · Pandas",
      read: "",
      title: "Filtering DataFrames: the patterns I use most",
      excerpt: "A short reference for the filtering tricks I keep coming back to — single conditions, multiple conditions, and .isin().",
      url: "",
    },
    {
      date: "Planned · Machine Learning",
      read: "",
      title: "Building my first churn model",
      excerpt: "What I learned about feature engineering, training/testing splits, and evaluating ML models.",
      url: "",
    },
    {
      date: "Planned · Learning",
      read: "",
      title: "How I'm structuring my data science learning",
      excerpt: "My approach to learning — build something small, document it, then move on to the next concept.",
      url: "",
    },
  ],

  /* ---------- CURRENTLY (hero pill) ---------- */
  currently: {
    label: "Currently",
    text: "Enrolled at Moringa School · Data Science Program",
  },

  /* ---------- AVAILABILITY ---------- */
  availability: {
    available: true,
    text: "Open to internships",
    footerText: "Open to internships · Nairobi, Kenya",
  },
};