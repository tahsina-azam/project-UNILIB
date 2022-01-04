import "../HeroSection.css";
const AboutUs = () => {
  return (
    <div className="bg-success9 p-5" style={{ width: "100%" }}>
      <h5>Our Goal:</h5>
      <p>
        The main aim of Unilib is to make easy sharing of books, notes, research
        papers, or any other sources for enthusiastic minds. Students and
        teachers can discuss anything in a single space- Unilib.
      </p>
      <p>There are two types of account.</p>
      <h5>Types of accounts: </h5>
      <br />
      <h6>Admin:</h6>
      <p>
        Admins will be in charge of the entire library management system. <br />
        <br />
        Admins have the following characteristics: <br />
      </p>
      <ul>
        <li>
          Examine user reports, investigate other users, create accounts for
          teachers, delete specific user accounts, respond to and solve problems
          for other users, and investigate other users.
        </li>
        <li>
          Updating and categorizing the database is a must (removing or adding a
          book, changing the status of a book).
        </li>
        <li>
          If a book is available, give it to the user. They are in charge of
          book distribution and book availability updates. Admins also upload
          the first few pages of any hard copies that contain the relevant
          information. They can upload the entire book in the case of soft
          copies. Also, admins upload the first few pages of available hard
          copies with necessary information.
        </li>
      </ul>
      <h6>Users:</h6>
      <p>
        Teachers and students can both use the system. By using badges, we can
        determine the sort of user.
        <br />
        <br /> User characteristics include:
        <br />
        <br />
      </p>
      <ul>
        <li>
          {" "}
          Make the necessary modifications to their accounts. They'll have a
          profile with a list of the books they've borrowed and returned. It
          shows the user's contribution and involvement history. Profiles can be
          searched for or seen.
        </li>
        <li>
          {" "}
          Other user When it comes to book distribution, librarians give hard
          copies. As a result, readers can gain an overview by looking at the
          brief pdfs supplied by the administrators.
        </li>
        <li>
          Work with the administrators. They can look for books, make requests,
          make recommendations, and even report on other users. If consumers
          wish to borrow hard copies, they'll have to wait until later to
          receive them from the administration. They can get soft copies from
          the library (if they are available).
        </li>
      </ul>
      <br />
      <h5> An Extra Feature To Fulfil The Aim of Unilib:</h5>
      <br />
      <p>
        It is not just a conduct system between users and libraries. It is more
        than that. To make it more flexible for users, we introduced Forum. It
        is free from the admin's supervision.
        <br />
        <br />
        Features of Forum:{" "}
      </p>
      <ul>
        <li>Users can search for books by title and author.</li>
        <li> They can share notes, books, research papers with users.</li>
        <li>They can delete books uploaded by them. </li>
        <li>They can download the pdfs from the library.</li>
        <li>
          They are free to discuss their academic issues. They can search or
          delete posts.
        </li>
      </ul>
      We tried our best to implement all the features perfectly. In the end,
      Unilib is a user-friendly library and resource management system. It
      assembles a swift media for academic help for both students and teachers.
      <footer class="text-center text-lg-start text-muted mt-5">
        <div
          class="text-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          <span>Contributors:</span>
          {"    "}
          <a href="https://github.com/owishiboo" class="me-4 text-reset">
            Nowshin Alam Owishi
          </a>
          <a href="https://github.com/tahsina-azam" class="me-4 text-reset">
            Tahsina Bintay Azam
          </a>
          <br />© 2021 Copyright: Dept. of CSE, SUST, BD
        </div>
      </footer>
    </div>
  );
};
export default AboutUs;
