import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ThemContext } from '../../ThemContext'

type Props = {}

const Home = (props: Props) => {

  const themeContext = useContext(ThemContext);
  const theme = Array.isArray(themeContext) ? themeContext[0] : 'light';
  const dark = theme === 'dark';

  return (
    <div>

      {/* Hero Section */}
      <div
        className={`d-flex flex-column align-items-center justify-content-center text-center py-5 ${dark ? 'bg-dark text-light' : 'bg-light text-dark'}`}
        style={{ minHeight: '60vh' }}
      >
        <h1 className="display-4 fw-bold mb-3">Find Your Dream Home</h1>
        <p className={`fs-5 mb-4 ${dark ? 'text-secondary' : 'text-muted'}`}>
          Browse thousands of properties for sale and rent across India.
        </p>
        <div className="d-flex gap-3">
          <Link to="/propertyListings" className="btn btn-primary btn-lg px-4">
            Browse Listings
          </Link>
          <Link to="/createPropertyListings" className="btn btn-outline-secondary btn-lg px-4">
            Post a Listing
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className={`py-5 ${dark ? 'bg-dark' : 'bg-white'}`}>
        <div className="container">
          <div className="row text-center g-4">
            {[
              { number: '1,200+', label: 'Properties Listed' },
              { number: '800+', label: 'Happy Buyers' },
              { number: '3', label: 'Cities Covered' },
              { number: '24/7', label: 'Support' },
            ].map((stat) => (
              <div className="col-6 col-md-3" key={stat.label}>
                <div
                  className={`p-4 rounded-4 shadow-sm`}
                  style={{ backgroundColor: dark ? '#1e293b' : '#f8f9fa' }}
                >
                  <h3 className="fw-bold text-primary mb-1">{stat.number}</h3>
                  <p className={`mb-0 small ${dark ? 'text-secondary' : 'text-muted'}`}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className={`py-5 ${dark ? 'bg-dark' : 'bg-light'}`}>
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Why Choose AK Real Estate?</h2>
          <div className="row g-4">
            {[
              { icon: '🏠', title: 'Wide Selection', desc: 'From apartments to villas, find exactly what you need.' },
              { icon: '💰', title: 'Best Prices', desc: 'Competitive pricing with no hidden charges.' },
              { icon: '📍', title: 'Prime Locations', desc: 'Properties in Mumbai, Pune, Delhi and more.' },
            ].map((feature) => (
              <div className="col-md-4" key={feature.title}>
                <div
                  className="p-4 rounded-4 shadow-sm h-100"
                  style={{ backgroundColor: dark ? '#1e293b' : '#ffffff' }}
                >
                  <div className="fs-1 mb-3">{feature.icon}</div>
                  <h5 className="fw-semibold mb-2">{feature.title}</h5>
                  <p className={`mb-0 small ${dark ? 'text-secondary' : 'text-muted'}`}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-5 bg-primary text-white text-center">
        <div className="container">
          <h2 className="fw-bold mb-3">Ready to Sell Your Property?</h2>
          <p className="mb-4 opacity-75">List your property today and reach thousands of buyers.</p>
          <Link to="/createPropertyListings" className="btn btn-light btn-lg px-5">
            Get Started
          </Link>
        </div>
      </div>

    </div>
  )
}

export default Home