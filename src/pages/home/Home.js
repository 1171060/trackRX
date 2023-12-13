import React from "react";
import "./Home.css";
import logo from "../../assets/images/logoB.png";
function Home(props) {
	return (
		<div style={{ margin: "10px" }} align="left">
			<div className="text-wrap">
				<img src={logo} className="align-left" alt="trackRX logo" />
				<p>
					<span className="largeFont moveMeDown">Welcome</span>
				</p>
				<p>
					to &nbsp; &nbsp;<span className="medFont">trackRX</span>, the ultimate
					solution for managing your prescription medications with ease and
					precision. Our application is meticulously designed to simplify the
					way you track and organize your prescription medications, ensuring you
					stay on top of your health regimen. We understand the challenges that
					come with managing multiple medications, which is why our app offers a
					seamless way to categorize, group, and monitor your prescriptions.
				</p>
				<p>
					With trackRX, you can effortlessly add notes for each medication,
					track your dosage, and record any reactions or side effects. Our
					intuitive interface allows you to view your medication schedule at a
					glance, making it easier than ever to follow your doctor's advice
					accurately. We are committed to empowering you with the tools you need
					to manage your health effectively. Whether you're keeping track of
					medications for yourself or a loved one, trackRX is here to ensure
					that you have all the information you need, right at your fingertips.
				</p>
			</div>
		</div>
	);
}

export default Home;
