import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useOnClickOutside from "use-onclickoutside";
import Logo from "../../assets/icons/logo";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";
const Header = ({ isErrorPage }) => {
	const [searchQuery, setSearchQuery] = useState("");
	const router = useRouter();
	// @ts-ignore
	const { cartItems } = useSelector(state => state.cart);
	const arrayPaths = [];

	const [onTop, setOnTop] = useState(
		!arrayPaths.includes(router.pathname) || isErrorPage ? false : true
	);
	const [menuOpen, setMenuOpen] = useState(false);
	const [searchOpen, setSearchOpen] = useState(false);
	const navRef = useRef(null);
	const searchRef = useRef(null);

	const headerClass = () => {
		if (window.pageYOffset === 0) {
			setOnTop(true);
		} else {
			setOnTop(false);
		}
	};

	useEffect(() => {
		if (!arrayPaths.includes(router.pathname) || isErrorPage) {
			return;
		}

		headerClass();
		window.onscroll = function () {
			headerClass();
		};
	}, []);

	const closeMenu = () => {
		setMenuOpen(false);
	};

	const closeSearch = () => {
		setSearchOpen(false);
	};

	// on click outside
	useOnClickOutside(navRef, closeMenu);
	useOnClickOutside(searchRef, closeSearch);

	return (
		<header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
			<div className="container">
				<Link href="/">
					<a
						style={{
							position: "absolute",
							top: "0",
							left: "0",
						}}
					>
						<h1 className="site-logo">
							<Logo />
						</h1>
					</a>
				</Link>
				<nav
					ref={navRef}
					className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
				>
					<Link href="/products/1">
						<a>Products</a>
					</Link>
					{/* <Link href="/blog">
						<a>Blog</a>
					</Link> */}
					<Link href="/contactUs">
						<a>Contact Us</a>
					</Link>
					<Link href="/auth/login">
						{/* <button className="site-nav__btn"> */}
						<a>Account</a>
						{/* </button> */}
					</Link>
				</nav>

				<div className="site-header__actions">
					<button
						ref={searchRef}
						className={`search-form-wrapper ${
							searchOpen ? "search-form--active" : ""
						}`}
					>
						<form
							className={`search-form`}
							action={`/search/${searchQuery}`}
						>
							<i
								className="icon-cancel"
								onClick={() => setSearchOpen(!searchOpen)}
							></i>
							<input
								type="text"
								// name="search"
								placeholder="Enter the product you are looking for"
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
							/>
						</form>
						<i
							onClick={() => {
								setSearchOpen(!searchOpen);
							}}
							className="icon-search"
						></i>
					</button>
					<Link href="/cart" prefetch={false}>
						<button className="btn-cart">
							<i className="icon-cart"></i>
							{cartItems.length > 0 && (
								<span className="btn-cart__count">
									{cartItems.length}
								</span>
							)}
						</button>
					</Link>
					<Link href="/auth/login">
						<button className="site-header__btn-avatar">
							<i className="icon-avatar"></i>
						</button>
					</Link>
					<button
						onClick={() => setMenuOpen(true)}
						className="site-header__btn-menu"
					>
						<i className="btn-hamburger">
							<span></span>
						</i>
					</button>
				</div>
			</div>
		</header>
	);
};

export default Header;
