import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';

import '../TeachersPage/Teacher.scss';
import { ReactComponent as Book } from '../../icons/book.svg';
import { ReactComponent as Star } from '../../icons/star.svg';
import { ReactComponent as Heart } from '../../icons/heart.svg';
import { getAllTeachersThunk } from '../../redux/operations.js';
import { selectAuthFavourites } from '../../redux/selector';
import { toggleFavourite } from '../../redux/reducer';
import { db } from '../../firebase.js';

const FavPage = () => {
  const dispatch = useDispatch();
  const favourites = useSelector(selectAuthFavourites);

  const [allTeachers, setAllTeachers] = useState([]);
  const [isReadMoreList, setIsReadMoreList] = useState([]);

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

  const onFavClick = data => {
    dispatch(toggleFavourite(data));
  };

  const favArr = allTeachers.filter(teacher =>
    favourites.includes(teacher.avatar_url)
  );

  return (
    <section className="teacherSection">
      <div className="container teacherBox">
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
                            <span className="levelsItemText">&#35;{level}</span>
                          </li>
                        ))}
                      </ul>
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
      </div>
    </section>
  );
};

export default FavPage;
