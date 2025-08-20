from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from openai import OpenAI
import os
from dotenv import load_dotenv
from service_shared import get_openai_client
from constants import APP_OPENAI_MODEL

app = Flask(__name__, static_folder='frontend/build', static_url_path='')
CORS(app)

def generate_response(prompt, setting, generator_type="education"):
    client = get_openai_client()

    if generator_type == "social-work":
        system_prompt = f"""
            **Objective**: Generate a detailed social work case scenario for Canadian practice. Ensure the following:
         
            **Provide an appropriate title for the case scenario**

            **1. Case Background**
            - **Setting**: Specify the practice setting, agency type, and community context (e.g., urban, rural, multicultural).
            - **Client System**: Introduce the primary client(s) and relevant family members, community members, or groups. Include demographics, cultural background, and presenting concerns.
            - **Referral Source**: Describe how the client came to services (self-referral, mandated, professional referral).
            - **Initial Conditions**: Describe the circumstances leading to social work involvement.

            **2. Case Scenario**
            Create a scenario that is engaging, thought-provoking, and useful for social work education. It should stimulate critical thinking, ethical reasoning, and application of social work knowledge and skills.
            Ensure the scenario reflects real-world complexity with multiple interacting systems (micro, mezzo, macro).
            Incorporate issues of diversity, equity, inclusion, and social justice relevant to Canadian social work practice.
            Present authentic challenges that require application of social work values, ethics, and theoretical frameworks.
            Include ethical dilemmas with no clear-cut solutions, requiring careful consideration of competing values and interests.
            Address power dynamics, oppression, and structural inequalities where relevant.

            **3. Decision Points and Analysis**
            - **Assessment Questions**: What biopsychosocial factors need to be considered? What strengths and resources are available?
            - **Intervention Planning**: What theoretical frameworks and practice models are most appropriate? What are the short and long-term goals?
            - **Ethical Considerations**: What ethical principles are at stake? How do personal values intersect with professional ethics?
            - **Systems Thinking**: How do various systems (family, community, organizational, policy) impact this case?
            - **Cultural Competence**: What cultural factors need to be considered? How can culturally responsive practice be ensured?
            - **Reflective Questions**: Include questions that promote critical analysis of social work practice, power, privilege, and social justice.
            
            **Canadian Context Guidelines:**
            - Reference relevant Canadian legislation, policies, and professional standards
            - Consider Indigenous perspectives and reconciliation where appropriate
            - Include considerations for Canada's multicultural context
            - Address relevant provincial/territorial variations in services and legislation
            - Consider Canadian healthcare and social service delivery systems
            
            Additional Guidelines for Diversity and Social Justice:
            Ensure authentic representation of diverse populations without stereotyping.
            Address systemic oppression and structural inequalities where relevant.
            Consider intersectionality and multiple identities.
        """
    elif generator_type == "nursing":
        system_prompt = f"""
            **Objective**: Generate a challenging nursing case scenario for Canadian healthcare practice that requires students to solve complex problems with no clear-cut answers. The case should assess students' ability to deal with real-world clinical contexts.
         
            **Provide an appropriate title for the case scenario**

            **1. Patient/Client Background**
            - **Demographics**: Include age, gender, cultural background, and relevant social determinants of health that create complexity.
            - **Medical History**: Present complex past medical history with multiple comorbidities that interact and complicate care decisions.
            - **Psychosocial Factors**: Include challenging family dynamics, support system issues, socioeconomic barriers, and cultural considerations that impact care.
            - **Current Presentation**: Describe ambiguous or conflicting symptoms that require careful clinical reasoning and differential thinking.

            **2. Complex Clinical Scenario**
            Create a challenging, realistic scenario that presents students with competing priorities and ethical dilemmas with no clear solutions.
            Include multiple interacting factors (physiological, psychological, social, spiritual, cultural) that create conflicting care priorities.
            Present resource limitations, time constraints, and system barriers that nurses face in real practice.
            Include conflicting information from different sources (patient, family, other healthcare providers, documentation).
            Create situations where evidence-based practice guidelines conflict with patient preferences, cultural beliefs, or institutional policies.
            Include power dynamics, advocacy challenges, and situations requiring moral courage.

            **3. Critical Thinking Questions for Students**
            Present the scenario, then include these challenging questions that require students to analyze, synthesize, and evaluate:

            **Clinical Reasoning Questions:**
            1. Given the conflicting assessment data, what are your top three priority concerns and why? How would you validate your clinical judgment?
            2. What additional information do you need to make safe care decisions, and how would you obtain it in this complex situation?
            3. How do you balance competing priorities when resources are limited and multiple urgent needs exist?

            **Ethical Dilemma Questions:**
            4. What ethical principles are in conflict in this scenario? How would you navigate competing values and interests?
            5. When patient/family wishes conflict with professional standards or evidence-based practice, how do you proceed?
            6. What are your professional obligations when you witness practices that concern you but are not clearly wrong?

            **Systems and Advocacy Questions:**
            7. How do system barriers and resource limitations impact your ability to provide optimal care? What advocacy strategies could you employ?
            8. When interprofessional team members disagree on the care plan, how do you navigate these relationships while ensuring patient safety?
            9. How do cultural, linguistic, or socioeconomic factors influence your assessment and care planning in this situation?

            **Professional Practice Questions:**
            10. What are the potential legal, ethical, and professional consequences of different courses of action?
            11. How would you document this complex situation to protect the patient, yourself, and the healthcare team?
            12. What learning needs do you identify for yourself based on this case, and how would you address them?

            **Reflection Questions:**
            13. How do your personal values and biases potentially impact your clinical judgment in this scenario?
            14. What would you do differently if you encountered a similar situation in the future?
            15. How does this case challenge your understanding of nursing practice and professional responsibilities?

            **Canadian Healthcare Context Requirements:**
            - Include specific Canadian nursing standards, legislation, and scope of practice considerations
            - Address Indigenous health perspectives, cultural safety, and reconciliation where relevant
            - Consider provincial/territorial variations and healthcare system constraints
            - Include French-English bilingual considerations where appropriate
            - Reference relevant Canadian legislation (Personal Health Information Acts, Mental Health Acts, etc.)
            
            **Ensure the case:**
            - Has no single "correct" answer but multiple defensible approaches
            - Requires students to justify their reasoning and consider alternatives
            - Reflects authentic nursing practice challenges in Canadian healthcare settings
            - Promotes critical thinking, ethical reasoning, and professional growth
            - Addresses cultural competency, anti-oppressive practice, and social justice
        """
    elif generator_type == "business":
        system_prompt = f"""
            **Objective**: Generate a challenging business case scenario for Canadian business practice that requires students to solve complex problems with no clear-cut answers. The case should assess students' ability to deal with real-world business contexts and competing stakeholder interests.
         
            **Provide an appropriate title for the case scenario**

            **1. Business Context and Background**
            - **Organization Profile**: Include company size, industry, market position, and organizational culture that create complexity.
            - **Stakeholder Landscape**: Present multiple stakeholders with competing interests (shareholders, employees, customers, community, regulators, suppliers).
            - **Market Conditions**: Include challenging market dynamics, competitive pressures, economic factors, and regulatory changes.
            - **Current Situation**: Describe ambiguous business challenges that require strategic thinking and difficult trade-offs.

            **2. Complex Business Scenario**
            Create a challenging, realistic scenario that presents students with competing priorities and ethical dilemmas with no clear solutions.
            Include multiple interacting factors (financial, operational, strategic, ethical, legal, social) that create conflicting business priorities.
            Present resource constraints, time pressures, and market uncertainties that business leaders face in real practice.
            Include conflicting data, stakeholder demands, and information from different sources that complicate decision-making.
            Create situations where best practices conflict with stakeholder expectations, cultural norms, or short-term pressures.
            Include sustainability challenges, social responsibility dilemmas, and situations requiring moral leadership.

            **3. Critical Analysis Questions for Students**
            Present the scenario, then include these challenging questions that require students to analyze, synthesize, and evaluate:

            **Strategic Analysis Questions:**
            1. Given the conflicting market data and stakeholder pressures, what are your top three strategic priorities and why? How would you validate your assumptions?
            2. What additional information do you need to make sound business decisions, and how would you obtain it in this uncertain environment?
            3. How do you balance short-term financial pressures with long-term sustainability and stakeholder interests?

            **Ethical Business Dilemma Questions:**
            4. What ethical principles and business values are in conflict in this scenario? How would you navigate competing stakeholder interests?
            5. When shareholder expectations conflict with employee welfare, environmental concerns, or community impact, how do you proceed?
            6. What are your professional obligations when you encounter practices that are legal but ethically questionable?

            **Leadership and Change Questions:**
            7. How do organizational culture, power dynamics, and resistance to change impact your ability to implement solutions?
            8. When team members or departments disagree on strategic direction, how do you build consensus while maintaining decisive leadership?
            9. How do cultural, economic, or regulatory differences influence your business strategy in Canadian and global markets?

            **Risk and Decision-Making Questions:**
            10. What are the potential financial, legal, reputational, and operational risks of different courses of action?
            11. How would you communicate complex decisions to different stakeholder groups while maintaining transparency and trust?
            12. What contingency plans would you develop for different scenarios, and how would you monitor their effectiveness?

            **Innovation and Sustainability Questions:**
            13. How do you balance innovation and growth with environmental sustainability and social responsibility?
            14. What role should technology and digital transformation play in addressing these business challenges?
            15. How does this case challenge traditional business models and require new approaches to value creation?

            **Canadian Business Context Requirements:**
            - Include specific Canadian business regulations, trade policies, and market considerations
            - Address Indigenous business partnerships, reconciliation, and cultural protocols where relevant
            - Consider federal/provincial jurisdictional differences and regulatory compliance
            - Include French-English bilingual market considerations where appropriate
            - Reference relevant Canadian legislation (Competition Act, Employment Standards, Environmental Protection, etc.)
            
            **Ensure the case:**
            - Has no single "correct" solution but multiple defensible strategic approaches
            - Requires students to justify their reasoning with data, theory, and stakeholder analysis
            - Reflects authentic business challenges in Canadian and global markets
            - Promotes critical thinking, ethical reasoning, and strategic leadership
            - Addresses corporate social responsibility, sustainability, and stakeholder capitalism
        """
    elif setting == "K-12":
        system_prompt = f"""
            **Objective**: Generate a detailed educational case scenario for an Canadian {setting} setting. Ensure the following:
         
            **Provide an appropriate title for the case scenario**

            **1. Scenario Background**
            - **Setting**: Specify the grade level, subject area, and type of school (e.g., public, private, urban, rural).
            - **Characters**: Introduce the main characters involved, including students with specific traits (e.g., learning styles, behavioral characteristics), fellow teachers, and possibly parents or guardians.
            - **Initial Conditions**: Describe the initial conditions and circumstances leading up to the scenario, setting the stage for the narrative.

            **2. Scenario**
            Create a scenario that is engaging, thought-provoking, and useful for training purposes in a teacher education program. It should stimulate critical thinking, problem-solving, and ethical reasoning skills.
            Ensure the scenario has multiple layers of complexity, accurately reflecting real-world classroom situations. Incorporate diverse perspectives and backgrounds to represent a broad spectrum of classroom experiences. Present challenges that are authentic, relevant, and pertinent to the current educational context of the scenario.
            Introduce ethical or moral dilemmas relevant to the scenario, ensuring there are no clear right or wrong answers. Craft the scenario to be culturally sensitive and inclusive, respecting diverse backgrounds and viewpoints.

            **3. Decision Points**
            - **Teaching Quality Standards**: Ask which teaching quality standards are being met or not met in the scenario. Ask what the teacher could have done differently to meet the standards.
            - **Reflective Questions**: Include reflective questions at the end of the scenario to prompt deeper thinking about the choices made, their implications, and alternative strategies.
            - **AI Evaluation**: Ask what the AI has missed in the development of the scenario in terms of key components such as voice, values, and pedagogical approaches.
            
            Additional Guidelines for Diversity and Inclusion
            Do not mention or use learning styles. 

            Ensure diversity in the representation of characters in terms of gender, ethnicity, age, and professional background.
        """
    elif setting == "Adult professional learning":
        system_prompt = f"""
            **Objective**: Generate a detailed case scenario for an Canadian {setting} setting. Ensure the following:
         
            **Provide an appropriate title for the case scenario**

            **1. Scenario Background**
            - **Setting:** Specify the professional environment (e.g., corporate, healthcare, technology, government). Include details about the organization type (e.g., small business, multinational corporation, public sector, non-profit).
            - **Characters:** Introduce the main characters involved, including adult learners with specific professional backgrounds, job roles, experience levels, and personal traits. Include other relevant characters like colleagues, supervisors, clients, or industry stakeholders.
            - **Initial Conditions:** Describe the initial conditions and circumstances leading up to the scenario, setting the stage for the narrative. This could include organizational changes, market shifts, technological advancements, or interpersonal dynamics at the workplace.
            
            **2. Scenario**
            Create a scenario that is engaging, thought-provoking, and useful for training purposes in a teacher education program. It should stimulate critical thinking, problem-solving, and ethical reasoning skills.
            Ensure the scenario has multiple layers of complexity, accurately reflecting real-world classroom situations. Incorporate diverse perspectives and backgrounds to represent a broad spectrum of classroom experiences. Present challenges that are authentic, relevant, and pertinent to the current educational context of the scenario.
            Introduce ethical or moral dilemmas relevant to the scenario, ensuring there are no clear right or wrong answers. Craft the scenario to be culturally sensitive and inclusive, respecting diverse backgrounds and viewpoints.
            Introduce ethical or moral dilemmas relevant to the professional setting, ensuring no clear right or wrong answers, such as conflicts of interest, ethical use of data, or balancing company policy with personal values.
            Align scenarios with professional standards, industry regulations, and organizational policies, reflecting realistic professional challenges.
            Ensure scenarios are culturally sensitive and inclusive, respecting diverse professional and personal backgrounds.
            
            **3. Decision Points**
            - **Critical Choices:** Provide key decision points in the scenario where the participant must choose a course of action in response to the situation.
            - **Consequences:** Outline the potential consequences (both positive and negative) for each decision, taking into account the professional context.
            - **Reflective Questions:** Include reflective questions at the end of the scenario to prompt deeper thinking about the choices made, their implications, and alternative strategies.
            
         
            Additional Guidelines for Diversity and Inclusion
            Do not mention or use learning styles. 
            Ensure diversity in the representation of characters in terms of gender, ethnicity, age, and professional background.
        """
    else:
        system_prompt = f"""
        **Objective**: Generate a detailed educational case scenario for a Canadian {setting} setting. Ensure the following:

        **Provide an appropriate title for the case scenario**

        **1. Scenario Background**
        - **Setting**: Specify the institution type (e.g., university, college), department, program level (undergraduate/graduate), and course context.
        - **Characters**: Introduce the key stakeholders involved, including faculty members, students, teaching assistants, administrators, and relevant support staff.
        - **Initial Conditions**: Describe the academic context, institutional policies, and circumstances leading to the scenario.

        **2. Scenario**
        Create a scenario that is engaging, thought-provoking, and useful for training purposes in a teacher education program. It should stimulate critical thinking, problem-solving, and ethical reasoning skills.
        Ensure the scenario has multiple layers of complexity, accurately reflecting real-world classroom situations. Incorporate diverse perspectives and backgrounds to represent a broad spectrum of classroom experiences. Present challenges that are authentic, relevant, and pertinent to the current educational context of the scenario.
        Introduce ethical or moral dilemmas relevant to the scenario, ensuring there are no clear right or wrong answers. Craft the scenario to be culturally sensitive and inclusive, respecting diverse backgrounds and viewpoints.
        Introduce ethical or moral dilemmas relevant to the professional setting, ensuring no clear right or wrong answers, such as conflicts of interest, ethical use of data, or balancing company policy with personal values.
        Align scenarios with professional standards, industry regulations, and organizational policies, reflecting realistic professional challenges.
        Ensure scenarios are culturally sensitive and inclusive, respecting diverse professional and personal backgrounds.

        **3. Decision Points**
        - **Strategic Choices**: Present key decision points that require careful consideration of institutional policies, academic standards, and stakeholder interests.
        - **Impact Analysis**: Outline potential implications for student learning, academic quality, institutional reputation, and stakeholder relationships.
        - **Reflective Questions**: Include questions that promote critical analysis of higher education practices, policies, and pedagogical approaches.

        Additional Guidelines for Higher Education Context:
        - Include references to relevant academic policies and procedures
        - Consider implications for academic freedom and institutional autonomy
        - Address aspects of professional development and scholarly teaching
        - Include considerations for diverse student populations and learning needs
                - Reference relevant regulatory frameworks and accreditation standards
        """

    completion = client.chat.completions.create(
        model=APP_OPENAI_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
    )
    return completion.choices[0].message.content

@app.route('/generate', methods=['POST'])
def generate():
    data = request.json
    setting = data.get('setting')
    case_category = data.get('case_category')
    options = data.get('options')
    context = data.get('context')
    user_context = data.get('user_context')
    generator_type = data.get('generator_type', 'education')

    if generator_type == 'social-work':
        if user_context:
            prompt = f"""Generate a social work case scenario for the practice area of {case_category} with a specific focus on {options} in the context of {setting} and {context}. Ensure that the scenario includes the following consideration: {user_context}.
                        The generated scenario should be in a prose format. It should be engaging, thought-provoking, and useful for social work education. It should stimulate critical thinking, ethical reasoning, and application of social work knowledge and skills.
                        Ensure that there is no clear-cut answer and that multiple intervention approaches could be considered.
    """
        else:
            prompt = f"""Generate a social work case scenario for the practice area of {case_category} with a specific focus on {options} in the context of {setting} and {context}.
                        The generated scenario should be in a prose format. It should be engaging, thought-provoking, and useful for social work education. It should stimulate critical thinking, ethical reasoning, and application of social work knowledge and skills.
                        Ensure that there is no clear-cut answer and that multiple intervention approaches could be considered.
    """
    elif generator_type == 'nursing':
        if user_context:
            prompt = f"""Generate a nursing case scenario for the specialty area of {case_category} with a specific focus on {options} in the clinical setting of {setting} and {context}. Ensure that the scenario includes the following consideration: {user_context}.
                        The generated scenario should be in a prose format. It should be engaging, clinically relevant, and useful for nursing education. It should stimulate critical thinking, clinical reasoning, and application of nursing knowledge and skills.
                        Ensure that there are multiple valid nursing interventions and that clinical judgment is required for prioritization.
    """
        else:
            prompt = f"""Generate a nursing case scenario for the specialty area of {case_category} with a specific focus on {options} in the clinical setting of {setting} and {context}.
                        The generated scenario should be in a prose format. It should be engaging, clinically relevant, and useful for nursing education. It should stimulate critical thinking, clinical reasoning, and application of nursing knowledge and skills.
                        Ensure that there are multiple valid nursing interventions and that clinical judgment is required for prioritization.
    """
    elif generator_type == 'business':
        if user_context:
            prompt = f"""Generate a business case scenario for the business area of {case_category} with a specific focus on {options} in the context of {setting} and {context}. Ensure that the scenario includes the following consideration: {user_context}.
                        The generated scenario should be in a prose format. It should be engaging, strategically relevant, and useful for business education. It should stimulate critical thinking, ethical reasoning, and application of business knowledge and leadership skills.
                        Ensure that there are multiple valid strategic approaches and that business judgment is required for decision-making with competing stakeholder interests.
    """
        else:
            prompt = f"""Generate a business case scenario for the business area of {case_category} with a specific focus on {options} in the context of {setting} and {context}.
                        The generated scenario should be in a prose format. It should be engaging, strategically relevant, and useful for business education. It should stimulate critical thinking, ethical reasoning, and application of business knowledge and leadership skills.
                        Ensure that there are multiple valid strategic approaches and that business judgment is required for decision-making with competing stakeholder interests.
    """
    else:
        if user_context:
            prompt = f"""Generate a scenario for the category of {case_category} with a focus on {options} for the following context: {context}. Ensure that the scenario includes the following consideration: {user_context}.
                        The generated scenario should be in a prose format. It should be engaging, thought-provoking, and useful for training purposes in a teacher education program. It should stimulate critical thinking, problem-solving, and ethical reasoning skills.
                        Ensure that there is no clear-cut answer for each scenario.
    """
        else:
            prompt = f"""Generate a scenario for the category of {case_category} with a focus on {options} for the following context: {context}.
                        The generated scenario should be in a prose format. It should be engaging, thought-provoking, and useful for training purposes in a teacher education program. It should stimulate critical thinking, problem-solving, and ethical reasoning skills.
                        Ensure that there is no clear-cut answer for each scenario.
    """

    response = generate_response(prompt, setting, generator_type)
    return jsonify(response)

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8000))
    debug = os.environ.get('FLASK_ENV', 'development') == 'development'
    app.run(host='0.0.0.0', port=port, debug=debug)
