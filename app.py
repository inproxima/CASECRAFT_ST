#Libraries
from openai import OpenAI
import streamlit as st
import streamlit_ext as ste
import os
from dotenv import load_dotenv


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



#Sidebar settings
st.sidebar.header("CaseCraft")
st.sidebar.write("Custom Adaptive Scenario Education Creation and Resource Adaptation Facility Tool")
setting = st.sidebar.radio("Please select the educational context:",["K-12","Adult professional learning"])

#choices
st.sidebar.header("Choices")

if setting =="K-12":

    def generate_response(prompt, setting):
        client = OpenAI()

        completion = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": """
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
        ("Classroom Management", "Inclusive Education", "Professional Dilemmas","Pedagogical Challenges","Parent and Community Engagement", "Student Well-being and Mental Health", "Assessment and Evaluation", "Cultural and Linguistic Diversity", "Professional Development and Self-Reflection","Educational Policy and Administration","Sustainability and Environmental Education")
    )

    if case_category == "Classroom Management":
        options = st.sidebar.selectbox(
            "Select a subcategory for Classroom Management",
            ("classroom environment", "implementing discipline strategies", "dealing with challenging behaviors")
        )

    elif case_category == "Inclusive Education":
        options = st.sidebar.selectbox(
            "Select a subcategory for Inclusive Education",
            ("classroom environment", "differentiating instruction for special needs students", "accommodating diverse learners","Cultural inclusivity"," language barriers", "integrating students with disabilities")
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
else:
    def generate_response(prompt, setting):
        client = OpenAI()

        completion = client.chat.completions.create(
            model="gpt-4-turbo",
            messages=[
                {"role": "system", "content": """
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
                ("managing stress and burnout", "balancing work and personal life", "cmental health awareness in the workplace", "supporting colleagues with mental health issues", "supporting colleagues with mental health issues")
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


if st.sidebar.button("Generate Case"):
    scenorio = generate_response(prompt,setting)
    st.write(scenorio)
    st.divider()
    ste.download_button("Download Case", scenorio, "case.txt")

st.sidebar.divider()
st.sidebar.header("About")
st.sidebar.markdown(
"""
This application was created by [Soroush Sabbaghan](mailto:ssabbagh@ucalgary.ca) and [Barb Brown](mailto:babrown@ucalgary.ca) using [Streamlit](https://streamlit.io/) . It is powered by [OpenAI API](https://openai.com/api/)'s 
[GPT-4 Turbo API](https://platform.openai.com/docs/models/overview) for educational purposes. 
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
Version 2024.04.10 
"""
)


            
    


