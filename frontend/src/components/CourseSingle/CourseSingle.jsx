import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseSingleComponent = ({ course_id }) => {
  const [course, setCourse] = useState();

  useEffect(() => {
    const fetchCourseById = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/course/no-auth/${course_id}`);
        setCourse(response.data);
        console.log("Course: ", response.data);
      } catch (error) {
        console.log("Error fetching course: ", error);
      }
    };
    fetchCourseById();
  }, [course_id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      {/* Header Start */}
      <div className="container-fluid page-header" style={{ marginBottom: '90px' }}>
        <div className="container">
          <div className="d-flex flex-column justify-content-center" style={{ minHeight: '300px' }}>
            <h3 className="display-4 text-white text-uppercase">Single</h3>
            <div className="d-inline-flex text-white">
              <p className="m-0 text-uppercase"><a className="text-white" href="">Home</a></p>
              <i className="fa fa-angle-double-right pt-1 px-3"></i>
              <p className="m-0 text-uppercase">Single</p>
            </div>
          </div>
        </div>
      </div>
      {/* Header End */}

      {/* Detail Start */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8">
              <div className="mb-5">
                <h6 className="text-primary mb-3">{course && formatDate(course.created_at)}</h6>
                <h1 className="mb-5">{course && course.title}</h1>
                <img className="img-fluid rounded w-100 mb-4" src={course && `http://127.0.0.1:8080${course.photo_url}`} alt="Image" />
                <p>Sadipscing labore amet rebum est et justo gubergren. Et eirmod ipsum sit diam ut magna lorem.
                  Nonumy vero labore lorem sanctus rebum et lorem magna kasd, stet amet magna accusam
                  consetetur eirmod. Kasd accusam sit ipsum sadipscing et at at sanctus et. Ipsum sit
                  gubergren dolores et, consetetur justo invidunt at et aliquyam ut et vero clita. Diam sea
                  sea no sed dolores diam nonumy, gubergren sit stet no diam kasd vero.</p>
                <p>Voluptua est takimata stet invidunt sed rebum nonumy stet, clita aliquyam dolores vero stet
                  consetetur elitr takimata rebum sanctus. Sit sed accusam stet sit nonumy kasd diam dolores,
                  sanctus lorem kasd duo dolor dolor vero sit et. Labore ipsum duo sanctus amet eos et.
                  Consetetur no sed et aliquyam ipsum justo et, clita lorem sit vero amet amet est dolor
                  elitr, stet et no diam sit. Dolor erat justo dolore sit invidunt.</p>
                <h2 className="mb-4">Est dolor lorem et ea</h2>
                <img className="img-fluid rounded w-50 float-left mr-4 mb-3" src="img/blog-1.jpg" alt="Image" />
                <p>Diam dolor est labore duo invidunt ipsum clita et, sed et lorem voluptua tempor invidunt at
                  est sanctus sanctus. Clita dolores sit kasd diam takimata justo diam lorem sed. Magna amet
                  sed rebum eos. Clita no magna no dolor erat diam tempor rebum consetetur, sanctus labore sed
                  nonumy diam lorem amet eirmod. No at tempor sea diam kasd, takimata ea nonumy elitr
                  sadipscing gubergren erat. Gubergren at lorem invidunt sadipscing rebum sit amet ut ut,
                  voluptua diam dolores at sadipscing stet. Clita dolor amet dolor ipsum vero ea ea eos.
                  Invidunt sed diam dolores takimata dolor dolore dolore sit. Sit ipsum erat amet lorem et,
                  magna sea at sed et eos. Accusam eirmod kasd lorem clita sanctus ut consetetur et. Et duo
                  tempor sea kasd clita ipsum et. Takimata kasd diam justo est eos erat aliquyam et ut. Ea sed
                  sadipscing no justo et eos labore, gubergren ipsum magna dolor lorem dolore, elitr aliquyam
                  takimata sea kasd dolores diam, amet et est accusam labore eirmod vero et voluptua. Amet
                  labore clita duo et no. Rebum voluptua magna eos magna, justo gubergren labore sit.</p>
                <p>Diam dolor est labore duo invidunt ipsum clita et, sed et lorem voluptua tempor invidunt at
                  est sanctus sanctus. Clita dolores sit kasd diam takimata justo diam lorem sed. Magna amet
                  sed rebum eos. Clita no magna no dolor erat diam tempor rebum consetetur, sanctus labore sed
                  nonumy diam lorem amet eirmod. No at tempor sea diam kasd, takimata ea nonumy elitr
                  sadipscing gubergren erat.</p>
              </div>

              {/* Comment List */}
              <div className="mb-5">
                <h3 className="text-uppercase mb-4" style={{ letterSpacing: '5px' }}>3 Comments</h3>
                <div className="media mb-4">
                  <img src="img/user.jpg" alt="Image" className="img-fluid rounded-circle mr-3 mt-1" style={{ width: '45px' }} />
                  <div className="media-body">
                    <h6>John Doe <small><i>01 Jan 2045 at 12:00pm</i></small></h6>
                    <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at.
                      Kasd diam tempor rebum magna dolores sed sed eirmod ipsum. Gubergren clita aliquyam
                      consetetur sadipscing, at tempor amet ipsum diam tempor consetetur at sit.</p>
                    <button className="btn btn-sm btn-secondary">Reply</button>
                  </div>
                </div>
                <div className="media mb-4">
                  <img src="img/user.jpg" alt="Image" className="img-fluid rounded-circle mr-3 mt-1" style={{ width: '45px' }} />
                  <div className="media-body">
                    <h6>John Doe <small><i>01 Jan 2045 at 12:00pm</i></small></h6>
                    <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum et no at.
                      Kasd diam tempor rebum magna dolores sed sed eirmod ipsum. Gubergren clita aliquyam
                      consetetur sadipscing, at tempor amet ipsum diam tempor consetetur at sit.</p>
                    <button className="btn btn-sm btn-secondary">Reply</button>
                    <div className="media mt-4">
                      <img src="img/user.jpg" alt="Image" className="img-fluid rounded-circle mr-3 mt-1" style={{ width: '45px' }} />
                      <div className="media-body">
                        <h6>John Doe <small><i>01 Jan 2045 at 12:00pm</i></small></h6>
                        <p>Diam amet duo labore stet elitr ea clita ipsum, tempor labore accusam ipsum
                          et no at. Kasd diam tempor rebum magna dolores sed sed eirmod ipsum.
                          Gubergren clita aliquyam consetetur, at tempor amet ipsum diam tempor at
                          sit.</p>
                        <button className="btn btn-sm btn-secondary">Reply</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comment Form */}
              <div className="bg-secondary rounded p-5">
                <h3 className="text-uppercase mb-4" style={{ letterSpacing: '5px' }}>Leave a comment</h3>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name *</label>
                    <input type="text" className="form-control border-0" id="name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input type="email" className="form-control border-0" id="email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="website">Website</label>
                    <input type="url" className="form-control border-0" id="website" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea id="message" cols="30" rows="5" className="form-control border-0"></textarea>
                  </div>
                  <div className="form-group mb-0">
                    <input type="submit" value="Leave a comment" className="btn btn-primary py-md-2 px-md-4 mt-2" />
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 mt-5 mt-lg-0">
              {/* Categories */}
              <div className="d-flex flex-column text-center bg-secondary rounded mb-5 py-5 px-4">
                <h3 className="text-primary mb-3">Categories</h3>
                <a href="" className="text-white mb-2">Web Design <span className="badge badge-primary">150</span></a>
                <a href="" className="text-white mb-2">Web Development <span className="badge badge-primary">131</span></a>
                <a href="" className="text-white mb-2">Online Marketing <span className="badge badge-primary">78</span></a>
                <a href="" className="text-white mb-2">Keyword Research <span className="badge badge-primary">56</span></a>
                <a href="" className="text-white mb-2">Email Marketing <span className="badge badge-primary">98</span></a>
              </div>

              {/* Recent Post */}
              <div className="mb-5">
                <h3 className="text-uppercase mb-4" style={{ letterSpacing: '5px' }}>Recent Post</h3>
                <div className="d-flex align-items-center bg-secondary rounded overflow-hidden mb-3" style={{ height: '110px' }}>
                  <img className="img-fluid" src="img/blog-1.jpg" alt="Image" />
                  <div className="pl-3">
                    <h6 className="text-white">Diam amet eos at no eos</h6>
                    <small className="text-body">Jan 01, 2045</small>
                  </div>
                </div>
                <div className="d-flex align-items-center bg-secondary rounded overflow-hidden mb-3" style={{ height: '110px' }}>
                  <img className="img-fluid" src="img/blog-2.jpg" alt="Image" />
                  <div className="pl-3">
                    <h6 className="text-white">Diam amet eos at no eos</h6>
                    <small className="text-body">Jan 01, 2045</small>
                  </div>
                </div>
                <div className="d-flex align-items-center bg-secondary rounded overflow-hidden mb-3" style={{ height: '110px' }}>
                  <img className="img-fluid" src="img/blog-3.jpg" alt="Image" />
                  <div className="pl-3">
                    <h6 className="text-white">Diam amet eos at no eos</h6>
                    <small className="text-body">Jan 01, 2045</small>
                  </div>
                </div>
                <div className="d-flex align-items-center bg-secondary rounded overflow-hidden mb-3" style={{ height: '110px' }}>
                  <img className="img-fluid" src="img/blog-1.jpg" alt="Image" />
                  <div className="pl-3">
                    <h6 className="text-white">Diam amet eos at no eos</h6>
                    <small className="text-body">Jan 01, 2045</small>
                  </div>
                </div>
                <div className="d-flex align-items-center bg-secondary rounded overflow-hidden mb-3" style={{ height: '110px' }}>
                  <img className="img-fluid" src="img/blog-2.jpg" alt="Image" />
                  <div className="pl-3">
                    <h6 className="text-white">Diam amet eos at no eos</h6>
                    <small className="text-body">Jan 01, 2045</small>
                  </div>
                </div>
              </div>

              {/* Image */}
              <div className="mb-5">
                <img src="img/blog-1.jpg" alt="Image" className="img-fluid rounded" />
              </div>

              {/* Tags */}
              <div className="mb-5">
                <h3 className="text-uppercase mb-4" style={{ letterSpacing: '5px' }}>Tag Cloud</h3>
                <div className="d-flex flex-wrap m-n1">
                  <a href="" className="btn btn-primary m-1">Design</a>
                  <a href="" className="btn btn-primary m-1">Development</a>
                  <a href="" className="btn btn-primary m-1">Marketing</a>
                  <a href="" className="btn btn-primary m-1">SEO</a>
                  <a href="" className="btn btn-primary m-1">Writing</a>
                  <a href="" className="btn btn-primary m-1">Consulting</a>
                  <a href="" className="btn btn-primary m-1">Design</a>
                  <a href="" className="btn btn-primary m-1">Development</a>
                  <a href="" className="btn btn-primary m-1">Marketing</a>
                  <a href="" className="btn btn-primary m-1">SEO</a>
                  <a href="" className="btn btn-primary m-1">Writing</a>
                  <a href="" className="btn btn-primary m-1">Consulting</a>
                </div>
              </div>

              {/* Plain Text */}
              <div>
                <h3 className="text-uppercase mb-4" style={{ letterSpacing: '5px' }}>Plain Text</h3>
                <div className="bg-secondary text-center" style={{ padding: '30px' }}>
                  <p>Vero sea et accusam justo dolor accusam lorem consetetur, dolores sit amet
                    sit dolor clita kasd justo, diam accusam no sea ut tempor magna takimata, amet
                    sit et diam dolor ipsum amet diam</p>
                  <a href="" className="btn btn-primary py-2 px-4">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Detail End */}
    </div>
  );
};

export default CourseSingleComponent;
