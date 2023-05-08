import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function CourseInstructorsTab() {
    const { courseId } = useSelector(state => state.courseHome);
    const [loading, setLoading] = useState(true);

    const [allInstructors, setAllInstructors] = useState([]);

    useEffect(() => {
        getInstructors();
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
                    {allInstructors.length > 0 && allInstructors.map(instructor => (
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
                    {allInstructors.length < 1 && 
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

