#Libraries
from openai import OpenAI
import streamlit as st
import streamlit_ext as ste
import os
from dotenv import load_dotenv
from service_shared import get_openai_client
from constants import APP_OPENAI_MODEL

#page setting
st.set_page_config(page_title="CaseCraft", page_icon="🤖", initial_sidebar_state="expanded", layout="wide")

hide_st_style = """
        <style>
        #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            header {visibility: hidden;}
        </style>
"""
#st.markdown(hide_st_style, unsafe_allow_html=True)

#OpenAI APA Key
load_dotenv()
OpenAI.api_key = os.getenv("OPENAI_API_KEY") 
api = OpenAI.api_key

#functions

#Sidebar 
st.sidebar.header("CaseCraft")
st.sidebar.write("Custom Adaptive Scenario Education Creation and Resource Adaptation Facility Tool")
setting = st.sidebar.radio("Please select the educational context:",["K-12","Higher Education", "Adult professional learning"])

#choices
st.sidebar.header("Choices")

if setting =="K-12":

    def generate_response(prompt, setting):
        client = get_openai_client()

        completion = client.chat.completions.create(
            model=APP_OPENAI_MODEL,
            messages=[
                {"role": "system", "content": f"""
                    **Objective**: Generate a detailed educational case scenario for an Canadian {setting} setting. Ensure the following:
                 
                    **Provide an appropriate title for the case scenario**

                    **1. Scenario Background**
                    - **Setting**: Specify the grade level, subject area, and type of school (e.g., public, private, urban, rural).
                    - **Characters**: Introduce the main characters involved, including students with specific traits (e.g., learning styles, behavioral characteristics), fellow teachers, and possibly parents or guardians.
                    - **Initial Conditions**: Describe the initial conditions and circumstances leading up to the scenario, setting the stage for the narrative.

                    **2. Complexity and Realism**
                    - **Multiple Layers**: Ensure the scenario has multiple layers of complexity, accurately reflecting real-world classroom situations.
                    - **Diverse Perspectives**: Incorporate diverse perspectives and backgrounds to represent a broad spectrum of classroom experiences.
                    - **Realistic Challenges**: Present challenges that are authentic, relevant, and pertinent to the current educational context of the scenario.

                    **3. Ethical and Professional Considerations**
                    - **Moral Dilemmas**: Introduce ethical or moral dilemmas relevant to the scenario, ensuring there are no clear right or wrong answers.
                    - **Professional Standards**: Align the scenario with professional teaching standards and educational policies, ensuring it reflects realistic professional challenges.
                    - **Cultural Sensitivity**: Craft the scenario to be culturally sensitive and inclusive, respecting diverse backgrounds and viewpoints.

                    **4. Decision Points**
                    - Critical Choices: Provide key decision points in the scenario where the participant must choose a course of action in response to the situation.
                    - Consequences: Outline the potential consequences (both positive and negative) for each decision, taking into account the professional context.
                    - Reflective Questions: Include reflective questions at the end of the scenario to prompt deeper thinking about the choices made, their implications, and alternative strategies.
                    
                    Additional Guidelines for Diversity and Inclusion

                    Ensure diversity in the representation of characters in terms of gender, ethnicity, age, and professional background.
    """},
                {"role": "user", "content": prompt}
            ]
        )

        return completion.choices[0].message.content

    case_category = st.sidebar.selectbox(
        "To generate a case, please select from one of the following categories:",
        ("Behavioral Guidance", "Inclusive Education", "Professional Dilemmas","Pedagogical Challenges","Parent and Community Engagement", "Student Well-being and Mental Health", "Assessment and Evaluation", "Cultural and Linguistic Diversity", "Professional Development and Self-Reflection","Educational Policy and Administration","Sustainability and Environmental Education")
    )

    if case_category == "Behavioral Guidance":
        options = st.sidebar.selectbox(
            "Select a subcategory for Behavioral Guidance",
            ("classroom environment", "implementing discipline strategies", "dealing with challenging behaviors")
        )

    elif case_category == "Inclusive Education":
        options = st.sidebar.selectbox(
            "Select a subcategory for Inclusive Education",
            ("differentiating instruction for special needs students", "accommodating diverse learners","Cultural inclusivity"," language barriers", "integrating students with disabilities")
        )

    elif case_category == "Professional Dilemmas":
        options = st.sidebar.selectbox(
            "Select a subcategory for Professional Dilemmas",
            ("managing teacher-student boundaries", "confidentiality scenarios","responding to unethical behavior among colleagues")
        )

    elif case_category == "Pedagogical Challenges":
        options = st.sidebar.selectbox(
            "Select a subcategory for Pedagogical Challenges",
            ("implementing new teaching methodologies", "technology integration challenges", "engaging disinterested students","curriculum delivery issues")
        )

    elif case_category == "Parent and Community Engagement":
        options = st.sidebar.selectbox(
            "Select a subcategory for Parent and Community Engagement",
            ("handling parent-teacher meetings", "addressing parental concerns", "involving the community in education", "managing conflicts with parents")
        )

    elif case_category == "Student Well-being and Mental Health":
        options = st.sidebar.selectbox(
            "Select a subcategory for Student Well-being and Mental Health",
            ("recognizing and addressing student mental health issues", "bullying and social conflicts", "promoting student resilience", "supporting emotional well-being")
        )

    elif case_category == "Assessment and Evaluation":
        options = st.sidebar.selectbox(
            "Select a subcategory for Assessment and Evaluation",
            ("fair and effective grading practices", "providing constructive feedback", "dealing with academic dishonesty", "assessing student learning progress")
        )

    elif case_category == "Cultural and Linguistic Diversity":
        options = st.sidebar.selectbox(
            "Select a subcategory for Cultural and Linguistic Diversity",
            ("teaching in a multilingual classroom", "respecting and incorporating cultural differences", "overcoming language barriers", "celebrating diversity in the classroom")
        )

    elif case_category == "Professional Development and Self-Reflection":
        options = st.sidebar.selectbox(
            "Select a subcategory for Professional Development and Self-Reflection",
            ("reflecting on personal teaching practice", "pursuing continuous professional development", "mentorship and collaboration challenges", "career progression scenarios")
        )

    elif case_category == "Educational Policy and Administration":
        options = st.sidebar.selectbox(
            "Select a subcategory for Educational Policy and Administration",
            ("navigating educational policies", "school administration challenges", "adapting to curriculum changes", "dealing with bureaucratic constraints")
        )

    elif case_category == "Sustainability and Environmental Education":
        options = st.sidebar.selectbox(
            "Select a subcategory for Educational Policy and Administration",
            ("integrating sustainability into the curriculum", "fostering environmental awareness among students", "managing resource constraints in teaching")
        )

    context = st.sidebar.selectbox(
        "Context: Please select the context of the scenario:",
        ("Division 1 (Grades K-3)", "Division 2 (Grades 4-6)", "Division 3 (Grades 7-9)", "Division 4 High School (Grades 10-12)")
    )
    st.sidebar.write("Would you like to add a bit more to the context?")
    on = st.sidebar.toggle("Yes", value=False)

    if on: 
        user_context = st.sidebar.text_area("Please provide context that you would like to be included in the case.")
        prompt = f"""Generate a scenario for the category of {case_category} with a focus on {options} for the following context: {context}. Ensure that the scenario includes the following consideration: {user_context}.
                    The generated scenario should be in a prose format. It should be engaging, thought-provoking, and useful for training purposes in a teacher education program. It should stimulate critical thinking, problem-solving, and ethical reasoning skills.
                    Ensure that there is no clear-cut answer for each scenario.
"""
    else:
        prompt = f"""Generate a scenario for the category of {case_category} with a focus on {options} for the following context: {context}.
                    The generated scenario should be in a prose format. It should be engaging, thought-provoking, and useful for training purposes in a teacher education program. It should stimulate critical thinking, problem-solving, and ethical reasoning skills.
                    Ensure that there is no clear-cut answer for each scenario.
"""
elif setting == "Adult professional learning":
    def generate_response(prompt, setting):
        client = get_openai_client()

        completion = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "system", "content": f"""
                    **Objective**: Generate a detailed case scenario for an Canadian {setting} setting. Ensure the following:
                 
                    **Provide an appropriate title for the case scenario**

                    **1. Scenario Background**
                    - **Setting:** Specify the professional environment (e.g., corporate, healthcare, technology, government). Include details about the organization type (e.g., small business, multinational corporation, public sector, non-profit).
                    - **Characters:** Introduce the main characters involved, including adult learners with specific professional backgrounds, job roles, experience levels, and personal traits. Include other relevant characters like colleagues, supervisors, clients, or industry stakeholders.
                    - **Initial Conditions:** Describe the initial conditions and circumstances leading up to the scenario, setting the stage for the narrative. This could include organizational changes, market shifts, technological advancements, or interpersonal dynamics at the workplace.
                    
                    **2. Complexity and Realism**

                    - **Multiple Layers:** Ensure the scenario has multiple layers of complexity, reflecting real-world professional situations and adult learning challenges.
                    - **Diverse Perspectives:** Include diverse perspectives and backgrounds, representing the variety of experiences in a professional environment in Canada.
                    - **Realistic Challenges:** Present challenges authentic to the professional context, pertinent to current industry trends, workplace dynamics, and adult learning principles.
                    
                    **3. Ethical and Professional Considerations**

                    - **Moral Dilemmas:** Introduce ethical or moral dilemmas relevant to the professional setting, ensuring no clear right or wrong answers, such as conflicts of interest, ethical use of data, or balancing company policy with personal values.
                    - **Professional Standards:** Align scenarios with professional standards, industry regulations, and organizational policies, reflecting realistic professional challenges.
                    - **Cultural Sensitivity:** Ensure scenarios are culturally sensitive and inclusive, respecting diverse professional and personal backgrounds.
                    
                    **4. Decision Points**

                    - **Critical Choices:** Provide key decision points in the scenario where the participant must choose a course of action in response to the situation.
                    - **Consequences:** Outline the potential consequences (both positive and negative) for each decision, taking into account the professional context.
                    - **Reflective Questions:** Include reflective questions at the end of the scenario to prompt deeper thinking about the choices made, their implications, and alternative strategies.
                    
                 
                    Additional Guidelines for Diversity and Inclusion

                    Ensure diversity in the representation of characters in terms of gender, ethnicity, age, and professional background.
    """},
                {"role": "user", "content": prompt}
            ]
        )

        return completion.choices[0].message.content


    case_category = st.sidebar.selectbox(
        "To generate a case, please select from one of the following categories:",
        ("Workplace Diversity and Inclusion", "Professional Development and Skills Upgrading", "Leadership and Management Challenges","Work-Life Balance and Mental Health", "Career Transition and Advancement", "Technological Adaptation and Digital Transformation","Organizational Change and Adaptation","Communication and Interpersonal Skills")
    )

    if case_category == "Workplace Diversity and Inclusion":
            options = st.sidebar.selectbox(
                "Select a subcategory for Workplace Diversity and Inclusion",
                ("navigating cultural differences", "addressing language barriers", "fostering inclusive work environments","dealing with unconscious bias","promoting gender equality")
            )
    
    if case_category == "Professional Development and Skills Upgrading":
            options = st.sidebar.selectbox(
                "Select a subcategory for Professional Development and Skills Upgrading",
                ("adapting to new technologies", "continuous learning in a changing industry", "balancing work and professional development","peer-to-peer learning")
            )
    
    if case_category == "Leadership and Management Challenges":
            options = st.sidebar.selectbox(
                "Select a subcategory for Leadership and Management Challenges",
                ("managing remote teams", "leadership in times of change", "conflict resolution","mentorship and coaching","effective communication strategies")
            )
    
    if case_category == "Work-Life Balance and Mental Health":
            options = st.sidebar.selectbox(
                "Select a subcategory for Leadership and Management Challenges",
                ("managing stress and burnout", "balancing work and personal life", "mental health awareness in the workplace", "supporting colleagues with mental health issues", "supporting colleagues with mental health issues")
            )
    
    if case_category == "Career Transition and Advancement":
            options = st.sidebar.selectbox(
                "Select a subcategory for Workplace Career Transition and Advancement",
                ("navigating career changes", "overcoming barriers to career advancement", "developing new career skills")
            )

    if case_category == "Technological Adaptation and Digital Transformation":
            options = st.sidebar.selectbox(
                "Select a subcategory for Technological Adaptation and Digital Transformation",
                ("adapting to new digital tools", "managing digital transformation in the workplace", "data privacy and ethics", "leveraging technology for innovation")
            )

    if case_category == "Organizational Change and Adaptation":
            options = st.sidebar.selectbox(
                "Select a subcategory for Organizational Change and Adaptation",
                ("navigating organizational restructuring", "change management strategies", "managing resistance to change")
            )
    
    if case_category == "Communication and Interpersonal Skills":
            options = st.sidebar.selectbox(
                "Select a subcategory for Communication and Interpersonal Skills",
                ("effective cross-cultural communication", " handling difficult conversations", "team collaboration skills", "virtual communication in remote work settings")
            )

    st.sidebar.write("Would you like to add a bit more to the context?")
    on = st.sidebar.toggle("Yes", value=False)

    if on: 
        user_context = st.sidebar.text_area("Please provide additional information that you would like to add to the case.")
        prompt = f"""Generate a scenario for the category of {case_category} with a focus on {options}. Ensure that the scenario includes the following consideration: {user_context}.
                    The generated scenario should be in a prose format. It should be engaging, thought-provoking, and useful for training purposes in an adult professional learning setting. It should stimulate critical thinking, problem-solving, and ethical reasoning skills.
                    Ensure that there is no clear-cut answer for each scenario. 
"""
    else:
        prompt = f"""Generate a scenario for the category of {case_category} with a focus on {options}.
                The generated scenario should be in a prose format. It should be engaging, thought-provoking, and useful for training purposes in an adult professional learning setting. It should stimulate critical thinking, problem-solving, and ethical reasoning skills.
                Ensure that there is no clear-cut answer for each scenario.
"""

else:
    def generate_response(prompt, setting):
        client = get_openai_client()
        setting = "Higher Education"
        completion = client.chat.completions.create(
            model=APP_OPENAI_MODEL,
            messages=[
                {
                "role": "system",
                "content": f"""
                **Objective**: Generate a detailed educational case scenario for a Canadian {setting} setting. Ensure the following:

                **Provide an appropriate title for the case scenario**

                **1. Scenario Background**
                - **Setting**: Specify the institution type (e.g., university, college), department, program level (undergraduate/graduate), and course context.
                - **Characters**: Introduce the key stakeholders involved, including faculty members, students, teaching assistants, administrators, and relevant support staff.
                - **Initial Conditions**: Describe the academic context, institutional policies, and circumstances leading to the scenario.

                **2. Complexity and Realism**
                - **Multiple Layers**: Include various academic, administrative, and interpersonal dimensions that reflect the complexity of higher education.
                - **Diverse Perspectives**: Incorporate multiple viewpoints from different stakeholders within the academic community.
                - **Contemporary Challenges**: Address current issues in higher education such as academic integrity, technology integration, accessibility, or remote learning.

                **3. Ethical and Professional Considerations**
                - **Academic Ethics**: Present situations involving academic integrity, research ethics, or professional conduct in higher education.
                - **Institutional Policies**: Reference relevant institutional policies, academic regulations, and professional standards.
                - **Equity and Inclusion**: Address aspects of equity, diversity, and inclusion in the post-secondary context.

                **4. Decision Points**
                - **Strategic Choices**: Present key decision points that require careful consideration of institutional policies, academic standards, and stakeholder interests.
                - **Impact Analysis**: Outline potential implications for student learning, academic quality, institutional reputation, and stakeholder relationships.
                - **Reflective Questions**: Include questions that promote critical analysis of higher education practices, policies, and pedagogical approaches.

                Additional Guidelines for Higher Education Context:
                - Include references to relevant academic policies and procedures
                - Consider implications for academic freedom and institutional autonomy
                - Address aspects of professional development and scholarly teaching
                - Include considerations for diverse student populations and learning needs
                - Reference relevant regulatory frameworks and accreditation standards
                """,
            },
            {"role": "user", "content": prompt},
        ],
    )

        return completion.choices[0].message.content
    
    case_category = st.sidebar.selectbox(
        "To generate a case, please select from one of the following categories:",
        ("Graduate Supervision and Mentoring", "Academic Integrity and Ethics", "Teaching and Learning Innovation", "Research and Scholarly Activities", "Academic Leadership and Administration", "Student Support and Success", "Equity, Diversity, and Inclusion in Academia", "Academic Program Development and Quality Assurance")
    )

    if case_category == "Graduate Supervision and Mentoring":
            options = st.sidebar.selectbox(
                "Select a subcategory for Graduate Supervision and Mentoring",
                ("managing supervisor-student relationships", "supporting research progress", "addressing conflicts in supervision", "maintaining work-life boundaries", "supporting international graduate students")
            )
    
    if case_category == "Academic Integrity and Ethics":
            options = st.sidebar.selectbox(
                "Select a subcategory for Academic Integrity and Ethics",
                ("plagiarism and academic misconduct", "research ethics compliance", "intellectual property rights", "collaborative research ethics", "digital ethics in academia")
            )
    
    if case_category == "Teaching and Learning Innovation":
            options = st.sidebar.selectbox(
                "Select a subcategory for Teaching and Learning Innovation",
                ("blended learning implementation", "assessment design and academic integrity", "inclusive teaching practices", "technology integration in teaching", "experiential learning approaches")
            )
    
    if case_category == "Research and Scholarly Activities":
            options = st.sidebar.selectbox(
                "Select a subcategory for Research and Scholarly Activities",
                ("research funding and grant management", "research collaboration challenges", "publishing and academic impact", "balancing teaching and research", "community-engaged research")
            )
    
    if case_category == "Academic Leadership and Administration":
            options = st.sidebar.selectbox(
                "Select a subcategory for Academic Leadership and Administration",
                ("departmental leadership challenges", "faculty recruitment and retention", "managing academic programs", "budget and resource allocation", "strategic planning implementation")
            )

    if case_category == "Student Support and Success":
            options = st.sidebar.selectbox(
                "Select a subcategory for Student Support and Success",
                ("mental health and wellbeing", "academic accommodations", "supporting diverse learners", "career development support", "international student integration")
            )

    if case_category == "Equity, Diversity, and Inclusion in Academia":
            options = st.sidebar.selectbox(
                "Select a subcategory for Equity, Diversity, and Inclusion in Academia",
                ("inclusive curriculum design", "addressing systemic barriers", "promoting diverse representation", "cultural competency development", "accessibility in higher education")
            )
    
    if case_category == "Academic Program Development and Quality Assurance":
            options = st.sidebar.selectbox(
                "Select a subcategory for Academic Program Development and Quality Assurance",
                ("curriculum review and renewal", "accreditation processes", "program assessment methods", "stakeholder engagement", "market alignment and relevance")
            )

    st.sidebar.write("Would you like to add a bit more to the context?")
    on = st.sidebar.toggle("Yes", value=False)

    if on: 
        user_context = st.sidebar.text_area("Please provide additional information that you would like to add to the case.")
        prompt = f"""Generate a scenario for the category of {case_category} with a focus on {options}. Ensure that the scenario includes the following consideration: {user_context}.
                    The generated scenario should be in a prose format. It should be engaging, thought-provoking, and useful for training purposes in an adult professional learning setting. It should stimulate critical thinking, problem-solving, and ethical reasoning skills.
                    Ensure that there is no clear-cut answer for each scenario. 
"""
    else:
        prompt = f"""Generate a scenario for the category of {case_category} with a focus on {options}.
                The generated scenario should be in a prose format. It should be engaging, thought-provoking, and useful for training purposes in an adult professional learning setting. It should stimulate critical thinking, problem-solving, and ethical reasoning skills.
                Ensure that there is no clear-cut answer for each scenario.
"""

if st.sidebar.button("Generate Case"):
    scenorio = generate_response(prompt,setting)
    st.write(scenorio)
    st.divider()
    ste.download_button("Download Case", scenorio, "case.txt")

st.sidebar.divider()
st.sidebar.header("About")
st.sidebar.markdown(
"""
This application was created by [Soroush Sabbaghan](mailto:ssabbagh@ucalgary.ca) and [Barb Brown](mailto:babrown@ucalgary.ca) using [Streamlit](https://streamlit.io/) . It is powered by [OpenAI](https://openai.com/api/) technology for educational purposes. 
"""
)

st.sidebar.header("Copyright")
st.sidebar.markdown(
"""
This work has the following license: [Attribution-NonCommercial-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-nc-sa/4.0/)
"""
)

st.sidebar.header("Version")
st.sidebar.markdown(
"""
Version 2024.12.10 
"""
)


            
    


