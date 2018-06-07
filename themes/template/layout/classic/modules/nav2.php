<style>
html, body {
    height: 100%;
  }
  
  body {
    margin: 0;
    padding: 0 0 0 0;
  }
  
  * {
    box-sizing: border-box;
  }
  *::after, *::before {
    box-sizing: inherit;
  }
  
  h2 {
    margin: 0;
    color: #031615;
    font-family: "Nunito", sans-serif;
    font-size: 22px;
    font-weight: 800;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  a {
    text-decoration: none;
    color: inherit;
  }
  
  .background {
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .background span {
    display: block;
  }

  .background span.x {
    width: 10px;
    height: 60px;
    border-radius: 15px;
    position: absolute;
    top: 280px;
    right: 200px;
    background: #fff;
    transform: rotate(45deg);
    opacity: .8;
  }
  .background span.x::after {
    content: "";
    display: block;
    width: 10px;
    height: 60px;
    border-radius: 15px;
    position: absolute;
    transform: rotate(90deg);
    background: #fff;
  }
  
  .menu-ui {
    position: absolute;
    bottom: 0;
    left: -90px;
    margin: auto;
    width: 340px;
    height: 100%;
    background: #fff;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 10px 94px -45px #000;
    overflow: hidden;
  }
  .menu-ui .menu-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }
  .menu-ui .menu-wrapper .top-icons {
    width: 100%;
    position: absolute;
    z-index: 2;
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper {
    padding: 1.3rem 1.6rem;
    display: flex;
    align-items: center;
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper .ion-ios-settings {
    color: #cecfff;
    font-size: 30px;
    cursor: pointer;
    transition: all 500ms ease-in-out;
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper .ion-ios-settings:hover {
    transform: rotate(-90deg);
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper .bar-icon {
    margin-left: auto;
    direction: rtl;
    width: 35px;
    cursor: pointer;
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper .bar-icon span {
    display: block;
    width: 30px;
    height: 4px;
    background: #cecfff;
    border-radius: 50px;
    transition: all 600ms ease;
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper .bar-icon span:not(:last-child) {
    margin-bottom: .35rem;
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper .bar-icon span:nth-child(1) {
    width: 14px;
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper .bar-icon span:nth-child(1):after {
    left: -19px;
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper .bar-icon span:nth-child(2) {
    width: 8px;
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper .bar-icon span:nth-child(2):after {
    left: -13px;
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper .bar-icon span:nth-child(3) {
    width: 22px;
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper .bar-icon span:nth-child(3):after {
    left: -27px;
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper .bar-icon span:after {
    content: "";
    display: block;
    width: 4px;
    height: 4px;
    background: #cecfff;
    border-radius: 50%;
    position: relative;
    left: -30px;
    transition: all 400ms ease;
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper .bar-icon:hover span {
    width: 30px;
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper .bar-icon:hover span:nth-child(1):after {
    width: 16px;
    border-radius: 50px;
    left: 0px;
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper .bar-icon:hover span:nth-child(2):after {
    width: 22px;
    border-radius: 50px;
    left: 0;
  }
  .menu-ui .menu-wrapper .top-icons .icons-wrapper .bar-icon:hover span:nth-child(3):after {
    width: 8px;
    border-radius: 50px;
    left: 0;
  }
  .menu-ui .menu-wrapper .profile-info {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.05);
    z-index: 1;
  }
  .menu-ui .menu-wrapper .profile-info .profile-img {
    width: 90px;
    height: 90px;
    position: relative;
    background: #f1f1f1;
    border-radius: 50%;
    text-align: center;
  }
  .menu-ui .menu-wrapper .profile-info .profile-img::after {
    content: "";
    display: block;
    width: 18px;
    height: 18px;
    background: linear-gradient(to bottom, #88eb87, #22c221);
    border-radius: 50%;
    border: 3px solid #fff;
    position: absolute;
    bottom: 2px;
    right: 6px;
  }
  .menu-ui .menu-wrapper .profile-info .profile-img img {
    width: 100%;
    border-radius: 50%;
    -webkit-user-select: none;
    line-height: 100px;
  }
  .menu-ui .menu-wrapper .profile-info .profile-author {
    text-align: center;
  }
  .menu-ui .menu-wrapper .profile-info .profile-author .author__name {
    margin-top: 1.3rem;
    letter-spacing: .7px;
  }
  .menu-ui .menu-wrapper .profile-info .profile-author .author__job-title {
    margin: 0.7rem 0 0 0;
    color: #000;
    font-family: "Nunito", sans-serif;
    font-size: 14px;
    font-weight: 600;
  }
  .menu-ui .menu-wrapper .profile-info .profile-author .author__location {
    margin: 1.2rem 0 0 0;
    font-family: "Varela Round", sans-serif;
    font-size: 13px;
    position: relative;
  }
  .menu-ui .menu-wrapper .profile-info .profile-author .author__location i {
    margin-right: .3rem;
    padding: 0 1px;
    font-size: 14px;
    font-weight: 600;
    color: #929292;
    background: linear-gradient(90deg, #eeaeca 0%, #94bbe9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .menu-ui .menu-wrapper .menu-content {
    flex: 1;
    border-radius: 0 0 8px 8px;
    background: #eef4ff;
  }
  .menu-ui .menu-wrapper .menu-content .group {
    height: 100%;
    padding: 1.5rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .menu-ui .menu-wrapper .menu-content .group .profile-links-group {
    margin-bottom: 2rem;
  }
  .menu-ui .menu-wrapper .menu-content .group .profile-links-group li {
    margin-bottom: .1rem;
    transition: all 300ms ease;
  }
  .menu-ui .menu-wrapper .menu-content .group .profile-links-group li:hover a {
    color: #031615;
    padding-left: .4rem;
  }
  .menu-ui .menu-wrapper .menu-content .group .profile-links-group li a {
    display: block;
    padding: 1rem 0;
    transition: all 300ms ease;
    font-family: "Varela Round", sans-serif;
    font-size: 15px;
    font-weight: 400;
  }
  .menu-ui .menu-wrapper .menu-content .group .profile-links-group li.is-list-item-selected {
    margin: .9rem 0;
    background: #fff;
    border-left: 4px solid #bf55d2;
    border-radius: 0 50px 50px 0;
    box-shadow: 5px 0px 40px 10px rgba(0, 0, 0, 0.04);
  }
  .menu-ui .menu-wrapper .menu-content .group .profile-links-group li.is-list-item-selected a {
    padding: .9rem 1.5rem;
    color: #031615;
    font-family: "Nunito", sans-serif;
    font-weight: 800;
  }
  .menu-ui .menu-wrapper .menu-content .group .logout-btn {
    box-shadow: 0 0px 10px rgba(0, 0, 0, 0.15);
    position: relative;
    display: block;
    cursor: pointer;
    outline: 0;
    border: 0;
    margin: 0;
    width: 100%;
    padding: .7rem 0;
    align-self: center;
    background: #cecfff;
    color: #031615;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: .4px;
    border-radius: 50px;
    font-family: "Nunito", sans-serif;
    font-size: 15px;
    font-weight: 800;
    transition: all 350ms ease-in-out;
  }
  .menu-ui .menu-wrapper .menu-content .group .logout-btn span {
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    width: 50px;
    height: 100%;
    background: #ee0303;
    text-align: center;
    box-shadow: 0 0 20px -3px #ee0303;
    border-radius: 0 50px 50px 0;
    transition: all 400ms ease-in-out;
  }
  .menu-ui .menu-wrapper .menu-content .group .logout-btn span i {
    padding: .65rem 0;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }
  .menu-ui .menu-wrapper .menu-content .group .logout-btn:hover {
    background: #ee0303;
    color: #fff;
    box-shadow: 0 0 20px -3px #ee0303;
  }
  .menu-ui .menu-wrapper .menu-content .group .logout-btn:hover span {
    box-shadow: 0 0 90px -3px rgba(0, 0, 0, 0.25);
  }
  
</style>


<div class="menu-ui">
   <div class="menu-wrapper">
      <div class="top-icons">
         <div class="icons-wrapper">
            <i class="ion ion-ios-settings"></i>
            <div class="bar-icon">
               <span></span>
               <span></span>
               <span></span>
            </div>
         </div>
      </div>
      <div class="profile-info">
         <div class="profile-img">
         <a href="#" onClick="goToProfile(<?= $sm['user']['id']; ?>)">
            <img src="<?= $sm['user']['profile_photo']; ?>" alt="Avatar">
            </a>
         </div>
         <div class="profile-author">
            <h2 class="author__name"><?= $sm['user']['name'];?></h2>
            <p class="author__job-title">UI - UX Designer</p>
            <p class="author__location">
               <i class="ion ion-md-pin"></i>
               <?= $sm['user']['city'];?>
            </p>
         </div>
      </div>
      
      <div class="menu-content">
         <div class="group">
            <ul class="profile-links-group">
               <li class="list-item"><a href="#" data-murl="visits" data-b="0"><?= $sm['twoo_lang'][18]['text']; ?></a></li>
               <li class="list-item"><a href="#" data-murl="fans" data-b="0"><?= $sm['twoo_lang'][19]['text']; ?></a></li>
               <li class="list-item"><a href="#" data-murl="ilike" data-b="0"><?= $sm['twoo_lang'][20]['text']; ?></a></li>
               <li class="list-item"><a href="#" data-murl="matches" data-b="0"><?= $sm['twoo_lang'][21]['text']; ?></a></li>
               <li class="list-item"><a href="#" data-murl="settings" data-b="0"><?= $sm['twoo_lang'][22]['text']; ?></a></li>
               <li class="list-item is-list-item-selected"><a href="#" data-open-premium-modal="1" data-b="0"><?= $sm['twoo_lang'][25]['text']; ?></a></li>
               <li class="list-item"><a href="#" data-b="0"><?= $sm['twoo_lang'][23]['text']; ?></a></li>
            </ul>
            <button class="logout-btn">
               <span><i class="ion ion-ios-log-out"></i></span>
               <a href="<?= $sm['config']['site_url']; ?>logout"><?= $sm['twoo_lang'][24]['text']; ?></a>
            </button>
         </div>
      </div>
      
   </div>
</div>

<script>
		$(document).ready(function() {
			$(".bar-icon").on('click', function() {

				$(".menu-ui").css('width', '100px');
				$(".profile-info").hide();
				$(".menu-content").hide();
			});

			$(".list-item").on('click', function () {
				$(this).toggleClass('is-list-item-selected').siblings().removeClass('is-list-item-selected');
			});
		});
</script>