//状态提升的案例

function SharedInput({label, value, onChange}) {
    return (
        <div>
            <label>{label}</label>
            <input type="text" value={value} onChange={onChange}/>
        </div>
    )
}

const App = () => {
    const [sharedValue, setSharedValue] = useState('');

    const handleInputChange = (event) => {
        setSharedValue(event.target.value);
    }

    return (
        <div>
           <SharedInput label="First Input" value={sharedValue} onChange={handleInputChange}/>
           <SharedInput label="Second Input" value={sharedValue} onChange={handleInputChange}/>
           <p>Shared Value: {sharedValue}</p>
        </div>
    )
}

export default App;