import React, { useState } from 'react';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const CaseForm = ({ onGenerate, loading = false }) => {
  const [formData, setFormData] = useState({
    setting: 'K-12',
    case_category: 'Behavioral Guidance',
    options: 'classroom environment',
    context: 'Division 1 (Grades K-3)',
    user_context: '',
  });

  const k12Categories = {
    "Behavioral Guidance": ["classroom environment", "implementing discipline strategies", "dealing with challenging behaviors"],
    "Inclusive Education": ["differentiating instruction for special needs students", "accommodating diverse learners", "Cultural inclusivity", "language barriers", "integrating students with disabilities"],
    "Professional Dilemmas": ["managing teacher-student boundaries", "confidentiality scenarios", "responding to unethical behavior among colleagues"],
    "Pedagogical Challenges": ["implementing new teaching methodologies", "technology integration challenges", "engaging disinterested students", "curriculum delivery issues"],
    "Parent and Community Engagement": ["handling parent-teacher meetings", "addressing parental concerns", "involving the community in education", "managing conflicts with parents"],
    "Student Well-being and Mental Health": ["recognizing and addressing student mental health issues", "bullying and social conflicts", "promoting student resilience", "supporting emotional well-being"],
    "Assessment and Evaluation": ["fair and effective grading practices", "providing constructive feedback", "dealing with academic dishonesty", "assessing student learning progress"],
    "Cultural and Linguistic Diversity": ["teaching in a multilingual classroom", "respecting and incorporating cultural differences", "overcoming language barriers", "celebrating diversity in the classroom"],
    "Professional Development and Self-Reflection": ["reflecting on personal teaching practice", "pursuing continuous professional development", "mentorship and collaboration challenges", "career progression scenarios"],
    "Educational Policy and Administration": ["navigating educational policies", "school administration challenges", "adapting to curriculum changes", "dealing with bureaucratic constraints"],
    "Sustainability and Environmental Education": ["integrating sustainability into the curriculum", "fostering environmental awareness among students", "managing resource constraints in teaching"],
    "Complex Classrooms": ["multi-grade classrooms", "mixed-ability grouping", "large class sizes", "limited resources"]
  };

  const higherEdCategories = {
    "Graduate Supervision and Mentoring": ["managing supervisor-student relationships", "supporting research progress", "addressing conflicts in supervision", "maintaining work-life boundaries", "supporting international graduate students"],
    "Academic Integrity and Ethics": ["plagiarism and academic misconduct", "research ethics compliance", "intellectual property rights", "collaborative research ethics", "digital ethics in academia"],
    "Teaching and Learning Innovation": ["blended learning implementation", "assessment design and academic integrity", "inclusive teaching practices", "technology integration in teaching", "experiential learning approaches"],
    "Research and Scholarly Activities": ["research funding and grant management", "research collaboration challenges", "publishing and academic impact", "balancing teaching and research", "community-engaged research"],
    "Academic Leadership and Administration": ["departmental leadership challenges", "faculty recruitment and retention", "managing academic programs", "budget and resource allocation", "strategic planning implementation"],
    "Student Support and Success": ["mental health and wellbeing", "academic accommodations", "supporting diverse learners", "career development support", "international student integration"],
    "Equity, Diversity, and Inclusion in Academia": ["inclusive curriculum design", "addressing systemic barriers", "promoting diverse representation", "cultural competency development", "accessibility in higher education"],
    "Academic Program Development and Quality Assurance": ["curriculum review and renewal", "accreditation processes", "program assessment methods", "stakeholder engagement", "market alignment and relevance"],
    "Undergraduate Teacher Practicum": ["partner-teacher relationship dynamics", "professional boundaries and relationships", "classroom management during practicum", "balancing university coursework and practicum responsibilities", "navigating feedback and evaluation processes"]
  };

  const adultCategories = {
    "Workplace Diversity and Inclusion": ["navigating cultural differences", "addressing language barriers", "fostering inclusive work environments", "dealing with unconscious bias", "promoting gender equality"],
    "Professional Development and Skills Upgrading": ["adapting to new technologies", "continuous learning in a changing industry", "balancing work and professional development", "peer-to-peer learning"],
    "Leadership and Management Challenges": ["managing remote teams", "leadership in times of change", "conflict resolution", "mentorship and coaching", "effective communication strategies"],
    "Work-Life Balance and Mental Health": ["managing stress and burnout", "balancing work and personal life", "mental health awareness in the workplace", "supporting colleagues with mental health issues"],
    "Career Transition and Advancement": ["navigating career changes", "overcoming barriers to career advancement", "developing new career skills"],
    "Technological Adaptation and Digital Transformation": ["adapting to new digital tools", "managing digital transformation in the workplace", "data privacy and ethics", "leveraging technology for innovation"],
    "Organizational Change and Adaptation": ["navigating organizational restructuring", "change management strategies", "managing resistance to change"],
    "Communication and Interpersonal Skills": ["effective cross-cultural communication", "handling difficult conversations", "team collaboration skills", "virtual communication in remote work settings"]
  };

  const [categories, setCategories] = useState(k12Categories);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      if (name === 'setting') {
        if (value === 'K-12') {
          setCategories(k12Categories);
          newData.case_category = 'Behavioral Guidance';
          newData.options = 'classroom environment';
        } else if (value === 'Higher Education') {
          setCategories(higherEdCategories);
          newData.case_category = 'Graduate Supervision and Mentoring';
          newData.options = 'managing supervisor-student relationships';
        } else {
          setCategories(adultCategories);
          newData.case_category = 'Workplace Diversity and Inclusion';
          newData.options = 'navigating cultural differences';
        }
      }
      if (name === 'case_category') {
        newData.options = categories[value][0];
      }
      return newData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({ ...formData, generator_type: 'education' });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 text-gray-900">Configure Your Case</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="setting" className="block text-sm font-medium text-gray-700 mb-2">
          Educational Context
        </label>
        <div className="relative">
          <select
            id="setting"
            name="setting"
            className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-2 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm appearance-none hover:border-gray-400 transition-colors"
            value={formData.setting}
            onChange={handleChange}
          >
            <option value="K-12">K-12</option>
            <option value="Higher Education">Higher Education</option>
            <option value="Adult professional learning">Adult professional learning</option>
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
          Case Category
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
          Sub-category
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
          Context
        </label>
        <div className="relative">
          <select
            id="context"
            name="context"
            className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-2 border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg shadow-sm appearance-none hover:border-gray-400 transition-colors"
            value={formData.context}
            onChange={handleChange}
          >
            <option value="Division 1 (Grades K-3)">Division 1 (Grades K-3)</option>
            <option value="Division 2 (Grades 4-6)">Division 2 (Grades 4-6)</option>
            <option value="Division 3 (Grades 7-9)">Division 3 (Grades 7-9)</option>
            <option value="Division 4 High School (Grades 10-12)">Division 4 High School (Grades 10-12)</option>
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
            placeholder="Enter any specific requirements or context for your case study..."
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
          Generate Case
        </Button>
      </div>
      </form>
    </div>
  );
};

export default CaseForm;
