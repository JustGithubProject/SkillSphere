import React from 'react';

const CourseSiteSection = () => {
    return (
        <div className="site-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 mb-5">
                        <div className="mb-5">
                            <h3 className="text-black">Course Description</h3>
                            <p className="mb-4">
                                <strong className="text-black mr-3">Schedule: </strong> MWF 9:30 - 11:00
                            </p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim eum iure voluptatum provident natus, deleniti alias corporis dolorem architecto eligendi consequatur, veniam ratione qui adipisci, doloremque aspernatur? Debitis, quia, praesentium.</p>
                            <p>Molestias sit temporibus ullam voluptatem quibusdam. Accusamus labore perspiciatis similique veritatis ipsum iure quas. Nulla perspiciatis unde eveniet nihil, nesciunt repellat maxime ab libero minima voluptas dolore repudiandae adipisci. Cumque!</p>
                            <p>Enim harum voluptatem, itaque in illum quas temporibus tempore sit tempora quam atque eveniet, non aspernatur dignissimos aliquid praesentium exercitationem delectus, maxime velit saepe! Qui asperiores iure reprehenderit ad voluptas!</p>
                            <div className="row mb-4">
                                <div className="col-md-6">
                                    <img src="images/img_1.jpg" alt="Image" className="img-fluid rounded" />
                                </div>
                                <div className="col-md-6">
                                    <img src="images/img_2.jpg" alt="Image" className="img-fluid rounded" />
                                </div>
                            </div>
                            <p>Ipsam fuga fugiat vero repudiandae, tenetur a ullam, expedita perspiciatis dolores rem quibusdam numquam dicta sint unde repellat magni recusandae. Id, quibusdam, voluptatum. Amet mollitia ratione, illum animi quia ex?</p>
                            <p>Sint aut repudiandae, in amet nemo. Nobis labore id iure molestias reprehenderit quisquam illo quod cum dolorum aspernatur ut sequi, facere beatae, porro cupiditate magnam laborum laudantium laboriosam ab autem!</p>

                            <p className="mt-4"><a href="#" className="btn btn-primary">Admission</a></p>
                        </div>

                        <div className="pt-5">
                            <h3 className="mb-5">6 Comments</h3>
                            <ul className="comment-list">
                                <li className="comment">
                                    <div className="vcard bio">
                                        <img src="images/person_1.jpg" alt="Image placeholder" />
                                    </div>
                                    <div className="comment-body">
                                        <h3>Jean Doe</h3>
                                        <div className="meta">January 9, 2018 at 2:21pm</div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                        <p><a href="#" className="reply">Reply</a></p>
                                    </div>
                                </li>

                                <li className="comment">
                                    <div className="vcard bio">
                                        <img src="images/person_1.jpg" alt="Image placeholder" />
                                    </div>
                                    <div className="comment-body">
                                        <h3>Jean Doe</h3>
                                        <div className="meta">January 9, 2018 at 2:21pm</div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                        <p><a href="#" className="reply">Reply</a></p>
                                    </div>

                                    <ul className="children">
                                        <li className="comment">
                                            <div className="vcard bio">
                                                <img src="images/person_1.jpg" alt="Image placeholder" />
                                            </div>
                                            <div className="comment-body">
                                                <h3>Jean Doe</h3>
                                                <div className="meta">January 9, 2018 at 2:21pm</div>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                                <p><a href="#" className="reply">Reply</a></p>
                                            </div>

                                            <ul className="children">
                                                <li className="comment">
                                                    <div className="vcard bio">
                                                        <img src="images/person_1.jpg" alt="Image placeholder" />
                                                    </div>
                                                    <div className="comment-body">
                                                        <h3>Jean Doe</h3>
                                                        <div className="meta">January 9, 2018 at 2:21pm</div>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                                        <p><a href="#" className="reply">Reply</a></p>
                                                    </div>

                                                    <ul className="children">
                                                        <li className="comment">
                                                            <div className="vcard bio">
                                                                <img src="images/person_1.jpg" alt="Image placeholder" />
                                                            </div>
                                                            <div className="comment-body">
                                                                <h3>Jean Doe</h3>
                                                                <div className="meta">January 9, 2018 at 2:21pm</div>
                                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                                                <p><a href="#" className="reply">Reply</a></p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>

                                <li className="comment">
                                    <div className="vcard bio">
                                        <img src="images/person_1.jpg" alt="Image placeholder" />
                                    </div>
                                    <div className="comment-body">
                                        <h3>Jean Doe</h3>
                                        <div className="meta">January 9, 2018 at 2:21pm</div>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur quidem laborum necessitatibus, ipsam impedit vitae autem, eum officia, fugiat saepe enim sapiente iste iure! Quam voluptas earum impedit necessitatibus, nihil?</p>
                                        <p><a href="#" className="reply">Reply</a></p>
                                    </div>
                                </li>
                            </ul>
                            {/* END comment-list */}
                            <div className="comment-form-wrap pt-5">
                                <h3 className="mb-5">Leave a comment</h3>
                                <form action="#" className="p-5 bg-light">
                                    <div className="form-group">
                                        <label htmlFor="name">Name *</label>
                                        <input type="text" className="form-control" id="name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email *</label>
                                        <input type="email" className="form-control" id="email" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="website">Website</label>
                                        <input type="url" className="form-control" id="website" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea id="message" cols="30" rows="10" className="form-control"></textarea>
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" value="Post Comment" className="btn btn-primary" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 pl-lg-5">
                        <div className="mb-5 text-center border rounded course-instructor">
                            <h3 className="mb-5 text-black text-uppercase h6 border-bottom pb-3">Course Instructor</h3>
                            <div className="mb-4 text-center">
                                <img src="images/person_2.jpg" alt="Image" className="w-25 rounded-circle mb-4" />
                                <h3 className="h5 text-black mb-4">Christine Downey</h3>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa porro expedita libero pariatur vero eos.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseSiteSection;
