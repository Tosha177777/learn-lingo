import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';

import '../TeachersPage/Teacher.scss';
import { ReactComponent as Book } from '../../icons/book.svg';
import { ReactComponent as Online } from '../../icons/online.svg';
import { ReactComponent as Star } from '../../icons/star.svg';
import { ReactComponent as Heart } from '../../icons/heart.svg';
import { getAllTeachersThunk } from '../../redux/operations.js';
import { selectAuthFavourites } from '../../redux/selector';
import { toggleFavourite } from '../../redux/reducer';
import { db } from '../../firebase.js';
import TrialModal from 'components/TrialModal/TrialModal';

const FavPage = () => {
  const dispatch = useDispatch();
  const favourites = useSelector(selectAuthFavourites);

  const [allTeachers, setAllTeachers] = useState([]);
  const [isReadMoreList, setIsReadMoreList] = useState([]);
  const [isTrialOpened, setIsTrialOpened] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    const foo = async () => {
      try {
        const { payload } = await dispatch(getAllTeachersThunk(db));
        setAllTeachers(payload);
        return payload;
      } catch (err) {
        console.log(err);
      }
    };
    foo();
  }, [dispatch]);

  const toggleReadMore = avatar => {
    setIsReadMoreList(prevState => {
      const newState = [...prevState];
      newState[avatar] = !newState[avatar];
      return newState;
    });
  };

  const onTrialToggle = teacherData => {
    setIsTrialOpened(!isTrialOpened);
    setData(teacherData);
  };

  const onFavClick = data => {
    dispatch(toggleFavourite(data));
  };

  const favArr = allTeachers.filter(teacher =>
    favourites.includes(teacher.avatar_url)
  );

  return (
    <section className="teacherSection">
      <div className="container teacherBox">
        {favArr !== null && favArr.length > 0 ? (
          <ul className="teacherList">
            {favArr &&
              favArr.map(
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
                  reviews,
                }) => {
                  return (
                    <li key={nanoid()} className="teacherItem">
                      <div className="outlineBox">
                        <img
                          src={avatar_url}
                          alt="avatar"
                          className="avatarImg"
                        />
                        <Online
                          style={{
                            position: 'absolute',
                            top: '19px',
                            right: '23px',
                          }}
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
                        {!isReadMoreList[avatar_url] && (
                          <button
                            type="button"
                            className="readMoreBtn"
                            onClick={() => toggleReadMore(avatar_url)}
                          >
                            Read more
                          </button>
                        )}
                        {isReadMoreList[avatar_url] && (
                          <div className="reviewerBox">
                            <p className="expirience">{experience}</p>
                            <ul className="reviewList">
                              {reviews.map((reviewer, index) => {
                                return (
                                  <li key={index} className="reviewItem">
                                    <p className="languages reviewerName">
                                      {reviewer.reviewer_name}
                                    </p>
                                    <span className="reviewerRatingSpan">
                                      <Star className="start" />{' '}
                                      <span className="languages lessonsOnlineText">
                                        {rating}{' '}
                                      </span>
                                    </span>
                                    <p className=" languages specialityPar speciality">
                                      {reviewer.comment}
                                    </p>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        )}
                        <ul className="levelsList">
                          {levels.map((level, index) => (
                            <li key={index} className="levelsItem">
                              <span className="levelsItemText">
                                &#35;{level}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {isReadMoreList[avatar_url] && (
                          <button
                            className="logBtn trial"
                            onClick={() =>
                              onTrialToggle({ avatar_url, name, surname })
                            }
                          >
                            Book trial lesson
                          </button>
                        )}
                      </div>

                      <Heart
                        onClick={() => onFavClick(avatar_url)}
                        className={
                          favourites.some(teacher => teacher === avatar_url)
                            ? `heartBtn active`
                            : `heartBtn`
                        }
                      />
                    </li>
                  );
                }
              )}
          </ul>
        ) : (
          <h1>Sorry, here's no teachers yet</h1>
        )}
      </div>
      {isTrialOpened && <TrialModal data={data} onClose={onTrialToggle} />}
    </section>
  );
};

export default FavPage;
