import React, { useState } from 'react';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const BusinessForm = ({ onGenerate, loading = false }) => {
  const [formData, setFormData] = useState({
    setting: 'Corporate Enterprise',
    case_category: 'Strategic Management',
    options: 'market expansion and competitive positioning',
    context: 'Technology sector',
    user_context: '',
  });

  const businessCategories = {
    "Strategic Management": [
      "market expansion and competitive positioning",
      "mergers and acquisitions decisions",
      "digital transformation strategy",
      "business model innovation",
      "competitive response strategies"
    ],
    "Financial Management": [
      "capital structure decisions",
      "investment and divestment choices",
      "financial crisis management",
      "budgeting and resource allocation",
      "risk management strategies"
    ],
    "Marketing and Sales": [
      "brand crisis management",
      "market segmentation and targeting",
      "pricing strategy conflicts",
      "digital marketing transformation",
      "customer retention challenges"
    ],
    "Operations Management": [
      "supply chain disruptions",
      "quality control issues",
      "process optimization trade-offs",
      "capacity planning decisions",
      "outsourcing vs in-house production"
    ],
    "Human Resources": [
      "organizational restructuring",
      "talent acquisition and retention",
      "performance management systems",
      "diversity and inclusion initiatives",
      "labor relations and negotiations"
    ],
    "Ethics and Sustainability": [
      "corporate social responsibility",
      "environmental sustainability vs profitability",
      "ethical supply chain management",
      "stakeholder conflicts",
      "transparency and governance"
    ],
    "Innovation and Technology": [
      "disruptive technology adoption",
      "R&D investment priorities",
      "intellectual property strategies",
      "digital platform development",
      "innovation ecosystem partnerships"
    ],
    "International Business": [
      "global market entry strategies",
      "cross-cultural management challenges",
      "international trade disputes",
      "foreign exchange risk management",
      "global supply chain optimization"
    ],
    "Entrepreneurship": [
      "startup scaling challenges",
      "venture capital negotiations",
      "pivot or persevere decisions",
      "founder succession planning",
      "business model validation"
    ],
    "Crisis Management": [
      "reputation crisis response",
      "cybersecurity breach handling",
      "product recall decisions",
      "pandemic business continuity",
      "regulatory compliance failures"
    ]
  };

  const settingOptions = [
    "Corporate Enterprise",
    "Small-Medium Business",
    "Startup Company",
    "Non-Profit Organization",
    "Government Agency",
    "Multinational Corporation",
    "Family Business",
    "Social Enterprise",
    "Consulting Firm",
    "Financial Institution"
  ];

  const contextOptions = [
    "Technology sector",
    "Healthcare industry",
    "Manufacturing sector",
    "Retail and e-commerce",
    "Financial services",
    "Energy and utilities",
    "Transportation and logistics",
    "Hospitality and tourism",
    "Education sector",
    "Real estate and construction"
  ];

  const [categories] = useState(businessCategories);

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
    onGenerate({ ...formData, generator_type: 'business' });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Configure Your Business Case</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="setting" className="block text-sm font-medium text-gray-700 mb-2">
            Organization Type
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
            Business Domain
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
            Specific Challenge
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
            Industry Context
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
              placeholder="Enter specific market conditions, stakeholder constraints, or strategic considerations for your case study..."
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
            Generate Business Case
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BusinessForm;
