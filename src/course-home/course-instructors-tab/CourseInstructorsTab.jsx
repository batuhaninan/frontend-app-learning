import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getConfig } from '@edx/frontend-platform';

function CourseInstructorsTab() {
    const { courseId } = useSelector(state => state.courseHome);
    const [loading, setLoading] = useState(true);

    const [allInstructors, setAllInstructors] = useState([
        {
            linkedin: "https://www.linkedin.com/in/instructor1",
            cover_image: "instructor1.jpg",
            name: "John Doe",
            title: "Senior Developer",
            bio: "John Doe is a senior developer with over 10 years of experience in web development. He specializes in front-end frameworks and has a passion for creating user-friendly interfaces.",
        },
        {
            linkedin: "https://www.linkedin.com/in/instructor2",
            cover_image: "instructor2.jpg",
            name: "Jane Smith",
            title: "Data Scientist",
            bio: "Jane Smith is a data scientist with expertise in machine learning and statistical analysis. She has worked on various projects involving big data and enjoys finding insights from complex datasets.",
        },
        {
            linkedin: "https://www.linkedin.com/in/instructor3",
            cover_image: "instructor3.jpg",
            name: "Alex Johnson",
            title: "UX Designer",
            bio: "Alex Johnson is a UX designer who focuses on creating intuitive and visually appealing interfaces. With a background in psychology, he understands the importance of user experience in driving engagement.",
        },
    ]);

    useEffect(() => {
        // getInstructors();
    }, [])

    const getInstructors = async (dataJson) => {
        setLoading(true);

        let url = `${getConfig().CMS_URL}/api/v1/cms/course/instructor/${courseId}`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': `${getConfig().CMS_API_KEY}`
            },
        });

        if (response.code === 200) {
            setAllInstructors(response.data)
        }

        setLoading(false);
    }

    return (
        <div class="instructors">
            {loading ?
                <div class="row">
                    {allInstructors && allInstructors.length > 0 && allInstructors.map(instructor => (
                        <div class="col-12 col-sm-6 col-lg-3">
                            <div class="instructor card">
                                <a style="color:#4229E1;" href={instructor.linkedin} target="_blank">
                                    <i class="icon-linkedin"></i>
                                </a>
                                <img class="avatar" src={instructor.cover_image} alt={instructor.name} />

                                <h5 class="name">{instructor.name}</h5>
                                <span class="title">{instructor.title}</span>
                                <p class="text" style="height: 170px;overflow-x: hidden;overflow-y: scroll;">{instructor.bio}</p>

                            </div>
                        </div>
                    ))}
                    {allInstructors && allInstructors.length < 1 &&
                        <span>Gösterlecek eğıtmen bulunamadı.</span>
                    }
                </div>
                :
                <span>Yüklenıyor</span>
            }

        </div>
    );
}

export default CourseInstructorsTab;

