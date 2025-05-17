import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';

import { ReactComponent as Online } from '../../icons/online.svg';
import { ReactComponent as Book } from '../../icons/book.svg';
import { ReactComponent as Star } from '../../icons/star.svg';
import { ReactComponent as Heart } from '../../icons/heart.svg';
import './Teacher.scss';
import { db } from '../../firebase.js';
import {
  // getAllTeachersThunk,
  getStartTeachersThunk,
  loadMoreTeachersThunk,
} from '../../redux/operations.js';
import {
  selectAuthFavourites,
  selectAuthIsSignedIn,
} from '../../redux/selector';
import LoginModal from 'components/Login/LoginModal';
import { toggleFavourite } from '../../redux/reducer';
import TrialModal from 'components/TrialModal/TrialModal';

const TeachersPage = () => {
  const dispatch = useDispatch();
  const isSigned = useSelector(selectAuthIsSignedIn);
  const favourites = useSelector(selectAuthFavourites);

  const [lastKey, setLastKey] = useState(null);
  const [allTeachers, setAllTeachers] = useState([]);
  const [isReadMoreList, setIsReadMoreList] = useState([]);
  const [isOpenedLog, setIsOpenedLog] = useState(false);
  const [isTrialOpened, setIsTrialOpened] = useState(false);
  const [data, setData] = useState({});
  const [hasMoreData, setHasMoreData] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const { payload } = await dispatch(getStartTeachersThunk(db));
        console.log('payload: ', payload);
        setAllTeachers(payload.teachers);
        setLastKey(payload.lastKey);
        return payload;
      } catch (err) {
        console.log(err);
      }
    };

    fetchTeachers();
    if (isTrialOpened) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [dispatch, isTrialOpened]);

  // const loadMoreTeachers = async () => {
  //   setHasMoreData(!hasMoreData);
  //   try {
  //     const { payload } = await dispatch(getAllTeachersThunk(db));
  //     setAllTeachers(payload);
  //     console.log('payload: ', payload);

  //     return payload;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const loadMoreTeachers = async () => {
    if (!lastKey) return;

    try {
      const { payload } = await dispatch(
        loadMoreTeachersThunk({ db, lastKey })
      );
      setAllTeachers(prev => [...prev, ...payload.teachers]);
      setLastKey(payload.lastKey);
      setHasMoreData(payload.lastKey !== null);
      console.log('payloadInMore: ', payload);
    } catch (err) {
      console.log(err);
    }
  };

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

  const onLoginToggleModal = () => {
    setIsOpenedLog(!isOpenedLog);
  };

  const onFavClick = data => {
    dispatch(toggleFavourite(data));
  };

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
                            <span className="levelsItemText">&#35;{level}</span>
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
                    {isSigned ? (
                      <Heart
                        onClick={() => onFavClick(avatar_url)}
                        className={
                          favourites.some(teacher => teacher === avatar_url)
                            ? `heartBtn active`
                            : `heartBtn`
                        }
                      />
                    ) : (
                      <button className="heartBtn" onClick={onLoginToggleModal}>
                        <Heart />
                      </button>
                    )}
                  </li>
                );
              }
            )}
        </ul>

        {hasMoreData && (
          <button className=" logBtn loadMoreBtn" onClick={loadMoreTeachers}>
            Load More
          </button>
        )}
      </div>
      {isOpenedLog && <LoginModal onClose={onLoginToggleModal} />}
      {isTrialOpened && <TrialModal data={data} onClose={onTrialToggle} />}
    </section>
  );
};

export default TeachersPage;
