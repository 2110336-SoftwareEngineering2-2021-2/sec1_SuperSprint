import Layout from '../components/Layout';

function Landing() {
  return (
    <Layout title="Tuture">
      <div className="hero h-full">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="https://api.lorem.space/image/movie?w=260&h=400"
            className="max-w-sm rounded-lg shadow-2xl"
            alt="Tuture promo image"
          />
          <div>
            <h1 className="text-5xl font-bold">Tuture</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary">Get Started</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Landing;
