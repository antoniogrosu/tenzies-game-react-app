export default function Die(props){
    const styles = {
        backgroundColor : props.isHeld ? "#59E391" : "transparent"
    }
    return(
    <div className="num-case" onClick={props.clicked}
    style={styles}>
        <p><b>{props.value}</b></p>
    </div>
    )
}