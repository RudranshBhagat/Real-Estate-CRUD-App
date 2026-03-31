import { useContext } from 'react'
import { Card } from 'react-bootstrap'
import house from '../../assets/house.jpg'
import { ThemContext } from '../../ThemContext'

type Props = {
    type: string,
    value: string,
    info: string
}

const Tile = ({ type, value, info }: Props) => {

    const themeContext = useContext(ThemContext);
    const theme = Array.isArray(themeContext) ? themeContext[0] : 'light';
    const dark = theme === 'dark';

    return (
       <Card
    className={`border-0 shadow rounded-4 overflow-hidden my-2 ${dark ? 'text-light' : 'bg-white text-dark'}`}
    style={{
        width: '18rem',
        transition: 'transform 0.2s',
        cursor: 'pointer',
        backgroundColor: dark ? '#1e293b' : '#ffffff',  // ✅ lighter than body in dark mode
    }}
    onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px)')}
    onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
>
            {/* Full width image on top */}
            <Card.Img
                variant="top"
                src={house}
                style={{ height: '160px', objectFit: 'cover' }}
            />

            <Card.Body className="p-3">
                {/* Type badge */}
                <span className={`badge mb-2 ${dark ? 'bg-secondary' : 'bg-light text-dark border'}`}>
                    {type}
                </span>

                {/* Value */}
                <h5 className="fw-semibold mb-1">{value}</h5>

                {/* Info */}
                <p className={`small mb-0 ${dark ? 'text-secondary' : 'text-muted'}`}>
                    {info}
                </p>
            </Card.Body>
        </Card>
    )
}

export default Tile