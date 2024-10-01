import React from 'react';

const CourseSingleComponent = () => {
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
                <h6 className="text-primary mb-3">Jan 01, 2050</h6>
                <h1 className="mb-5">Vero ipsum sea justo dolore eirmod amet dolor tempor lorem</h1>
                <img className="img-fluid rounded w-100 mb-4" src="img/carousel-1.jpg" alt="Image" />
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
                    <input type="submit" value="Leave Comment" className="btn btn-primary py-md-2 px-md-4 font-weight-semi-bold" />
                  </div>
                </form>
              </div>
            </div>

            <div className="col-lg-4 mt-5 mt-lg-0">
              {/* Author Bio */}
              <div className="d-flex flex-column text-center bg-dark rounded mb-5 py-5 px-4">
                <img src="img/user.jpg" className="img-fluid rounded-circle mx-auto mb-3" style={{ width: '100px' }} alt="User" />
                <h3 className="text-primary mb-3">John Doe</h3>
                <p className="text-white m-0">Conset elitr erat vero dolor ipsum et diam, eos dolor lorem ipsum, ipsum
                  ipsum sit no ut est. Guber ea ipsum erat clita. Dolores diam magna</p>
              </div>

              {/* Search Form */}
              <div className="mb-5">
                <div className="input-group">
                  <input type="text" className="form-control form-control-lg" placeholder="Keyword" />
                  <div className="input-group-append">
                    <span className="input-group-text bg-transparent text-primary"><i className="fa fa-search"></i></span>
                  </div>
                </div>
              </div>

              {/* Category List */}
              <div className="mb-5">
                <h3 className="text-uppercase mb-4" style={{ letterSpacing: '5px' }}>Categories</h3>
                <div className="d-flex flex-wrap m-n1">
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Web Design</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Web Development</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Online Marketing</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Keyword Research</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Email Marketing</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Social Media</a>
                </div>
              </div>

              {/* Recent Post List */}
              <div className="mb-5">
                <h3 className="text-uppercase mb-4" style={{ letterSpacing: '5px' }}>Recent Post</h3>
                <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                  <img className="img-fluid rounded" src="img/blog-1.jpg" style={{ width: '80px', height: '80px', objectFit: 'cover' }} alt="Blog" />
                  <div className="pl-3">
                    <h6 className="text-primary mb-1">Lorem ipsum dolor sit amet</h6>
                    <small>Jan 01, 2050</small>
                  </div>
                </div>
                <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                  <img className="img-fluid rounded" src="img/blog-2.jpg" style={{ width: '80px', height: '80px', objectFit: 'cover' }} alt="Blog" />
                  <div className="pl-3">
                    <h6 className="text-primary mb-1">Lorem ipsum dolor sit amet</h6>
                    <small>Jan 01, 2050</small>
                  </div>
                </div>
                <div className="d-flex align-items-center border-bottom mb-3 pb-3">
                  <img className="img-fluid rounded" src="img/blog-3.jpg" style={{ width: '80px', height: '80px', objectFit: 'cover' }} alt="Blog" />
                  <div className="pl-3">
                    <h6 className="text-primary mb-1">Lorem ipsum dolor sit amet</h6>
                    <small>Jan 01, 2050</small>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <img className="img-fluid rounded" src="img/blog-1.jpg" style={{ width: '80px', height: '80px', objectFit: 'cover' }} alt="Blog" />
                  <div className="pl-3">
                    <h6 className="text-primary mb-1">Lorem ipsum dolor sit amet</h6>
                    <small>Jan 01, 2050</small>
                  </div>
                </div>
              </div>

              {/* Tags List */}
              <div className="mb-5">
                <h3 className="text-uppercase mb-4" style={{ letterSpacing: '5px' }}>Tag Cloud</h3>
                <div className="d-flex flex-wrap m-n1">
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Design</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Development</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Marketing</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">SEO</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Writing</a>
                  <a href="" className="btn btn-sm btn-outline-secondary m-1">Consulting</a>
                </div>
              </div>

              {/* Plain Text */}
              <div className="mb-5">
                <img src="img/blog-1.jpg" alt="Image" className="img-fluid rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Detail End */}
    </div>
  );
}

export default CourseSingleComponent;
