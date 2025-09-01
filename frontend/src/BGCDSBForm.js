import React, { useState } from 'react';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const BGCDSBForm = ({ onGenerate, loading = false }) => {
  const [formData, setFormData] = useState({
    setting: 'K-12 Classroom',
    case_category: 'Instructional AI Use',
    options: 'lesson planning with AI assistance',
    context: 'Grade 7-8 Catholic classroom',
    user_context: '',
  });

  const bgcdsbCategories = {
    "Instructional AI Use": [
      "lesson planning with AI assistance",
      "AI-generated assessment materials",
      "student use of AI for assignments",
      "AI for differentiated instruction",
      "AI feedback on student work"
    ],
    "Administrative AI Use": [
      "AI for report card comments",
      "attendance and behavior tracking",
      "parent communication drafting",
      "IEP documentation support",
      "scheduling and resource allocation"
    ],
    "Student Support & Well-being": [
      "AI counseling or mental health tools",
      "AI for identifying at-risk students",
      "behavior intervention planning",
      "AI-assisted special education support",
      "student data analysis for interventions"
    ],
    "Assessment & Evaluation": [
      "AI grading of assignments",
      "plagiarism and AI detection",
      "formative assessment generation",
      "standardized test preparation",
      "portfolio assessment with AI"
    ],
    "Professional Development": [
      "AI for teacher training",
      "lesson observation and feedback",
      "professional learning communities",
      "curriculum development with AI",
      "teaching practice reflection"
    ],
    "Faith Formation & Catholic Identity": [
      "AI in religious education",
      "prayer and liturgy planning",
      "Catholic social teaching integration",
      "sacramental preparation support",
      "faith-based counseling scenarios"
    ],
    "Parent & Community Engagement": [
      "AI for parent communication",
      "community partnership development",
      "school newsletter generation",
      "parent-teacher conference preparation",
      "fundraising and event planning"
    ],
    "Equity & Inclusion": [
      "AI bias in educational tools",
      "accessibility support with AI",
      "multilingual communication tools",
      "culturally responsive AI use",
      "digital divide considerations"
    ],
    "Data Privacy & Security": [
      "student data protection",
      "AI platform selection",
      "consent and permissions",
      "data retention policies",
      "third-party AI tool usage"
    ],
    "Emergency & Crisis Situations": [
      "AI in emergency response",
      "crisis communication",
      "online learning transitions",
      "student safety monitoring",
      "threat assessment protocols"
    ]
  };

  const settingOptions = [
    "K-12 Classroom",
    "School Administration Office",
    "Staff Meeting",
    "Parent-Teacher Conference",
    "Professional Development Day",
    "Catholic School Council",
    "Special Education Team",
    "School Board Meeting",
    "Student Support Services",
    "Faith Formation Program"
  ];

  const contextOptions = [
    "Grade K-3 Catholic classroom",
    "Grade 4-6 Catholic classroom",
    "Grade 7-8 Catholic classroom",
    "High school Catholic classroom",
    "Resource/Special Education setting",
    "School leadership team",
    "Catholic faith community",
    "Diverse multicultural school",
    "Rural Catholic school",
    "Urban Catholic school"
  ];

  const [categories] = useState(bgcdsbCategories);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      if (name === 'case_category') {
        newData.options = categories[value][0];
      }
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ ...formData, generator_type: 'bgcdsb' });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-900">BGCDSB AI Integration Scenario</h2>
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-blue-800 text-xs leading-relaxed">
          <strong>✝ Catholic Values Reminder:</strong> All AI use must align with our commitment to human dignity, 
          the sacred trust of Catholic education, and the formation of both minds and hearts.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="setting" className="block text-sm font-medium text-gray-700 mb-2">
            Educational Setting
          </label>
          <div className="relative">
            <select
              id="setting"
              name="setting"
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-2 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm appearance-none hover:border-gray-400 transition-colors"
              value={formData.setting}
              onChange={handleChange}
            >
              {settingOptions.map((setting) => (
                <option key={setting} value={setting}>
                  {setting}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="case_category" className="block text-sm font-medium text-gray-700 mb-2">
            AI Use Category
          </label>
          <div className="relative">
            <select
              id="case_category"
              name="case_category"
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-2 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm appearance-none hover:border-gray-400 transition-colors"
              value={formData.case_category}
              onChange={handleChange}
            >
              {Object.keys(categories).map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="options" className="block text-sm font-medium text-gray-700 mb-2">
            Specific AI Scenario
          </label>
          <div className="relative">
            <select
              id="options"
              name="options"
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-2 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm appearance-none hover:border-gray-400 transition-colors"
              value={formData.options}
              onChange={handleChange}
            >
              {categories[formData.case_category]?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="context" className="block text-sm font-medium text-gray-700 mb-2">
            School Context
          </label>
          <div className="relative">
            <select
              id="context"
              name="context"
              className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-2 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm appearance-none hover:border-gray-400 transition-colors"
              value={formData.context}
              onChange={handleChange}
            >
              {contextOptions.map((context) => (
                <option key={context} value={context}>
                  {context}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="user_context" className="block text-sm font-medium text-gray-700 mb-2">
            Additional Context
          </label>
          <div className="mt-1">
            <textarea
              id="user_context"
              name="user_context"
              rows={3}
              className="block w-full px-3 py-3 text-base border-2 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm hover:border-gray-400 transition-colors resize-none"
              placeholder="Enter specific Catholic school values, FASTER principles to emphasize, or particular challenges..."
              value={formData.user_context}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-amber-800 text-xs">
            <strong>Framework Guidance:</strong><br/>
            • <strong>FASTER:</strong> Fair, Accountable, Secure, Transparent, Explainable, Responsible<br/>
            • <strong>80/20 Rule:</strong> AI handles 80% routine, humans focus on 20% requiring judgment<br/>
            • <strong>Red Lines:</strong> Never replace human care, sacramental preparation, or pastoral counseling
          </p>
        </div>

        <div>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            startIcon={<PlayArrowIcon />}
            disabled={loading}
            sx={{ 
              textTransform: 'none', 
              py: 1.5,
              fontWeight: 'medium'
            }}
          >
            Generate BGCDSB Scenario
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BGCDSBForm;
