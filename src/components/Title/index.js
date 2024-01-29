import './title.css'
export default function Title({ children, text }) {
    return (
        <div className='title'>
            <h1>{children}</h1>
            <span>{text}</span>
        </div>
    )
}