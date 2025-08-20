import React, { useState } from 'react';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const SocialWorkForm = ({ onGenerate, loading = false }) => {
  const [formData, setFormData] = useState({
    setting: 'Child and Family Services',
    case_category: 'Child Protection',
    options: 'risk assessment and safety planning',
    context: 'Urban community setting',
    user_context: '',
  });

  const socialWorkCategories = {
    "Child Protection": [
      "risk assessment and safety planning",
      "family preservation vs. removal decisions",
      "working with resistant families",
      "multi-generational trauma",
      "substance abuse in families"
    ],
    "Mental Health and Substance Abuse": [
      "crisis intervention and suicide risk",
      "dual diagnosis cases",
      "involuntary commitment decisions",
      "community mental health resources",
      "addiction recovery support"
    ],
    "Healthcare Social Work": [
      "discharge planning challenges",
      "end-of-life decision making",
      "medical compliance issues",
      "family dynamics in illness",
      "healthcare access barriers"
    ],
    "Geriatric and Aging Services": [
      "elder abuse investigations",
      "capacity and guardianship issues",
      "aging in place vs. institutional care",
      "family caregiver stress",
      "dementia and behavioral challenges"
    ],
    "School Social Work": [
      "bullying and peer relationships",
      "academic and behavioral interventions",
      "family engagement in education",
      "trauma-informed school practices",
      "special education advocacy"
    ],
    "Community Development": [
      "neighborhood organizing and advocacy",
      "resource development and funding",
      "coalition building",
      "policy advocacy and change",
      "cultural competency in diverse communities"
    ],
    "Criminal Justice Social Work": [
      "pre-sentence investigations",
      "rehabilitation vs. punishment",
      "victim advocacy and support",
      "re-entry planning",
      "juvenile justice interventions"
    ],
    "Housing and Homelessness": [
      "emergency shelter decisions",
      "housing stability planning",
      "chronic homelessness interventions",
      "housing discrimination issues",
      "supportive housing programs"
    ],
    "Immigration and Refugee Services": [
      "asylum and refugee resettlement",
      "family separation and reunification",
      "cultural adaptation challenges",
      "documentation and legal status",
      "trauma from migration experiences"
    ],
    "Workplace and Employee Assistance": [
      "workplace harassment and discrimination",
      "employee mental health support",
      "work-life balance issues",
      "organizational change and stress",
      "conflict resolution in teams"
    ]
  };

  const settingOptions = [
    "Child and Family Services",
    "Mental Health Clinic",
    "Hospital/Medical Center",
    "Nursing Home/Long-term Care",
    "School District",
    "Community Center",
    "Correctional Facility",
    "Housing Authority",
    "Immigration Services",
    "Corporate/EAP Setting"
  ];

  const contextOptions = [
    "Urban community setting",
    "Rural community setting",
    "Suburban community setting",
    "Low-income neighborhood",
    "Diverse multicultural area",
    "Indigenous community",
    "Military/veteran community",
    "LGBTQ+ focused services"
  ];

  const [categories] = useState(socialWorkCategories);

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
    onGenerate({ ...formData, generator_type: 'social-work' });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Configure Your Social Work Case</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="setting" className="block text-sm font-medium text-gray-700 mb-2">
            Practice Setting
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
            Practice Area
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
            Specific Focus
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
            Community Context
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
              placeholder="Enter any specific requirements, client demographics, or contextual factors for your case study..."
              value={formData.user_context}
              onChange={handleChange}
            />
          </div>
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
            Generate Social Work Case
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SocialWorkForm;
