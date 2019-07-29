import fetch from "isomorphic-fetch";
import Error from "next/error";
import StoryList from "../components/StoryList";
import Layout from "../components/Layout";
import Link from "next/link";

class Index extends React.Component {
  static async getInitialProps({ req, res, query }) {
    // define stories
    let stories;

    // create page variable
    let page;

    // catch errors
    try {
      page = Number(query.page) || 1;
      const response = await fetch(
        `https://node-hnapi.herokuapp.com/news?page=${page}`
      );
      stories = await response.json();
    } catch (err) {
      console.log(err);
      stories = [];
    }

    // defining this.props
    return { page, stories };
  }

  render() {
    const { stories, page } = this.props;

    if (stories.length === 0) {
      return <Error statusCode={503} />;
    }

    return (
      <Layout
        title="Hacker Next"
        description="A clone of Hacker News built on Next.js"
      >
        <StoryList stories={stories} />

        <footer>
          <Link href={`/?page=${page + 1}`}>
            <a>Next Page ({page + 1})</a>
          </Link>
        </footer>

        <style jsx>{`
          footer {
            padding: 1em;
          }
          footer a {
            font-weight: bold;
            color: black;
            text-decoration: none;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Index;
