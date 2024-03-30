import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';

import { ReactComponent as Book } from '../../icons/book.svg';
import { ReactComponent as Star } from '../../icons/star.svg';
import './Teacher.scss';
import { db } from '../../firebase.js';
import { getAllTeachersThunk } from '../../redux/operations.js';

const TeachersPage = () => {
  const dispatch = useDispatch();

  const [allTeachers, setAllTeachers] = useState([]);

  useEffect(() => {
    const foo = async () => {
      try {
        const { payload } = await dispatch(getAllTeachersThunk(db));
        console.log('payload: ', payload);
        setAllTeachers(payload);
        return payload;
      } catch (err) {
        console.log(err);
      }
    };
    foo();
  }, [dispatch]);
  return (
    <section className="teacherSection">
      <div className="container teacherBox">
        <ul className="teacherList">
          {allTeachers &&
            allTeachers.map(
              ({
                avatar_url,
                conditions,
                experience,
                languages,
                lesson_info,
                lessons_done,
                levels,
                name,
                price_per_hour,
                rating,
                surname,
              }) => {
                return (
                  <li key={nanoid()} className="teacherItem">
                    <div className="outlineBox">
                      <img
                        src={avatar_url}
                        alt="avatar"
                        width={'96px'}
                        className="avatarImg"
                      />
                    </div>
                    <div className="aboutBox">
                      <div className="languagesBox">
                        <span className="languages">Languages</span>
                        <ul className="lessonsOnlineList">
                          <li className="lessonsOnlineItem">
                            <Book className="book" />{' '}
                            <span className="languages lessonsOnlineText">
                              Lessons online
                            </span>
                          </li>
                          <li className="lessonsOnlineItem">
                            <span className="languages lessonsOnlineText">
                              Lessons done: {lessons_done}
                            </span>
                          </li>
                          <li className="lessonsOnlineItem">
                            <Star className="start" />{' '}
                            <span className="languages lessonsOnlineText">
                              Rating: {rating}{' '}
                            </span>
                          </li>
                          <li className="lessonsOnlineItem">
                            <span className="languages lessonsOnlineText">
                              Price / 1 hour:{' '}
                              <span className="dollarColor">
                                {price_per_hour}&#36;
                              </span>
                            </span>
                          </li>
                        </ul>
                      </div>
                      <h3 className="name">
                        {name} {surname}
                      </h3>
                      <div className="specialityBox">
                        <p className="languages specialityPar">
                          Speaks:{' '}
                          <span className="speciality numberOfLanguages">
                            {' '}
                            {languages.join(',')}
                          </span>
                        </p>
                        <p className="languages specialityPar">
                          Lesson Info:
                          <span className="speciality">{lesson_info}</span>
                        </p>
                        <p className="languages specialityPar">
                          Conditions:
                          <span className="speciality">{conditions}</span>
                        </p>
                      </div>
                      <button type="button" className="readMoreBtn">
                        Read more
                      </button>
                    </div>
                  </li>
                );
              }
            )}
        </ul>
      </div>
    </section>
  );
};

export default TeachersPage;
