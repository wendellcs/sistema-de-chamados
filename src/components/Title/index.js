import './title.css'
export default function Title({ children, name }) {
    return (
        <div className='title'>
            <h1>{children}</h1>
            <span>{name}</span>
        </div>
    )
}