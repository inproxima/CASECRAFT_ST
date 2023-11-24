#Libraries
from openai import OpenAI
import streamlit as st
import streamlit_ext as ste
import os
from dotenv import load_dotenv


#page setting
st.set_page_config(page_title="ED Case Generative", page_icon="🤖", initial_sidebar_state="expanded", layout="wide")

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
def generate_response(prompt):
    client = OpenAI()

    completion = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": """
                **Objective**: Generate a detailed educational case scenario for a Canadian K-12 setting. Ensure the following:

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
                - **Critical Choices**: Provide key decision points in the scenario where the user (teacher) must choose a course of action in response to the situation. Ensure diversity in teacher and student selection.
"""},
            {"role": "user", "content": prompt}
        ]
    )

    return completion.choices[0].message.content


#Sidebar settings
st.sidebar.header("Choices")

case_category = st.sidebar.selectbox(
    "To generate a case, please select for one of the following categories:",
    ("Classroom Management", "Inclusive Education", "Professional Dilemmas","Pedagogical Challenges","Parent and Community Engagement", "Student Well-being and Mental Health", "Assessment and Evaluation", "Cultural and Linguistic Diversity", "Professional Development and Self-Reflection","Educational Policy and Administration","Sustainability and Environmental Education")
)

if case_category == "Classroom Management":
    options = st.sidebar.selectbox(
        "Select a subcategory for Classroom Management",
        ("Classroom environment", "Implementing discipline strategies", "dealing with challenging behaviors")
    )

elif case_category == "Inclusive Education":
    options = st.sidebar.selectbox(
        "Select a subcategory for Inclusive Education",
        ("Classroom environment", "Differentiating instruction for special needs students", "Accommodating diverse learners","Cultural inclusivity"," Language barriers", "Integrating students with disabilities")
    )

elif case_category == "Professional Dilemmas":
    options = st.sidebar.selectbox(
        "Select a subcategory for Professional Dilemmas",
        ("Managing teacher-student boundaries", "Confidentiality scenarios","Responding to unethical behavior among colleagues")
    )

elif case_category == "Pedagogical Challenges":
    options = st.sidebar.selectbox(
        "Select a subcategory for Pedagogical Challenges",
        ("Implementing new teaching methodologies", "Technology integration challenges", "Engaging disinterested students","curriculum delivery issues")
    )

elif case_category == "Parent and Community Engagement":
    options = st.sidebar.selectbox(
        "Select a subcategory for Parent and Community Engagement",
        ("Handling parent-teacher meetings", "addressing parental concerns", "Involving the community in education","managing conflicts with parents")
    )

elif case_category == "Student Well-being and Mental Health":
    options = st.sidebar.selectbox(
        "Select a subcategory for Student Well-being and Mental Health",
        ("Recognizing and addressing student mental health issues", "Bullying and social conflicts", "Promoting student resilience","Supporting emotional well-being")
    )

elif case_category == "Assessment and Evaluation":
    options = st.sidebar.selectbox(
        "Select a subcategory for Assessment and Evaluation",
        ("Fair and effective grading practices", "providing constructive feedback", "dealing with academic dishonesty","assessing student learning progress")
    )

elif case_category == "Cultural and Linguistic Diversity":
    options = st.sidebar.selectbox(
        "Select a subcategory for Cultural and Linguistic Diversity",
        ("Teaching in a multilingual classroom", "Respecting and incorporating cultural differences", "Overcoming language barriers","Celebrating diversity in the classroom")
    )

elif case_category == "Professional Development and Self-Reflection":
    options = st.sidebar.selectbox(
        "Select a subcategory for Professional Development and Self-Reflection",
        ("Reflecting on personal teaching practice", "Pursuing continuous professional development", "Mentorship and collaboration challenges","Career progression scenarios")
    )

elif case_category == "Educational Policy and Administration":
    options = st.sidebar.selectbox(
        "Select a subcategory for Educational Policy and Administration",
        ("Navigating educational policies", "School administration challenges", "Adapting to curriculum changes", "Dealing with bureaucratic constraints")
    )

elif case_category == "Sustainability and Environmental Education":
    options = st.sidebar.selectbox(
        "Select a subcategory for Educational Policy and Administration",
        ("Integrating sustainability into the curriculum", "Fostering environmental awareness among students", "Managing resource constraints in teaching")
    )


context = st.sidebar.selectbox("context"
    "please select the context of the scenorio",
    ("Division 1 (Grades K-3)", "Devision 2 (4-6)", "Middle School", "High School")
)

#Prompt setting
prompt = f"""Generate a scenorio for the category of {case_category} with a focus on {options} for the following context: {context}. 
The generated scenario should be in a prose format. It should engaging, thought-provoking, and useful for training purposes in a teacher education program. It should stimulate critical thinking, problem-solving, and ethical reasoning skills. 
                    Ensure the that their is not clear cut answer for each scenorio. 
"""

if st.sidebar.button("Generate Case"):
    scenorio = generate_response(prompt)
    st.write(scenorio)
    st.divider()
    ste.download_button("Download Case", scenorio, "case.txt")

st.sidebar.divider()
st.sidebar.header("About")
st.sidebar.markdown(
"""
This application was created by [Soroush Sabbaghan](mailto:ssabbagh@ucalgary.ca) using [Streamlit](https://streamlit.io/) . It is powered by [OpenAI API](https://openai.com/api/)'s 
[GPT-4 API](https://platform.openai.com/docs/models/overview) for educational purposes. 
"""
)

st.sidebar.header("Copyright")
st.sidebar.markdown(
"""
This work has the following license: [NonCommercial-NoDerivatives 4.0 International](https://creativecommons.org/licenses/by-nc-nd/4.0)
"""
)

st.sidebar.header("Version")
st.sidebar.markdown(
"""
November 24th, 2023 Version (1)
"""
)


            
    


