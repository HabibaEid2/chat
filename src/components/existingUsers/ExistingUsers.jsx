import './existingUsers.css'
import user_default_img from './../../assets/default-user-img.png'
export default function ExistingUsers({data}) {
    console.log(data)
    return(
        <ul className='existing-users'>
            {
                data.length === 0 ? 
                <em className='not-found-p'>
                    No users founded
                </em> : 
                data.map((ele,index)=> {
                    return <li key={`${index}`}>
                        <img 
                        src={data.profile_pic || user_default_img} 
                        alt="user image" />
                        <div className="txt">
                            <h5>{ele.name}</h5>
                            <em className="email">
                                {ele.email}
                            </em>
                        </div>
                    </li>
                })
            }
        </ul>
    )
}