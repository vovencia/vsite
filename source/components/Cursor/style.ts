import {styled} from "@utils";

module.exports = function StylesCursor(Cursor) {
	return styled(Cursor)`
		position: fixed;
		pointer-events: none;
		color: #20efa4;
		transition: color 0.3s;
		z-index: 1000;
		top: 50%;
		left: 50%;
		&:before {
			content: '';
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 0;
			height: 0;
			border: 2px solid rgba(255,255,255, 0.5);
			animation: pulse 1s infinite;
			border-radius: 50%;
			transition: all 0.3s;
			visibility: hidden;
			opacity: 0;
			@keyframes pulse {
				from {
					transform: scale(1)
				}
				50% {
					transform: scale(0.8)
				}
				to {
					transform: scale(1)
				}
			}
		}
		svg {
			display: block;
			width: 40rem;
			height: 40rem;
			color: #20efa4;
			fill: currentColor;
			stroke: currentColor;
			stroke-width: 0;
			z-index: 1;
			position: absolute;
			top: -20rem;
			left: -20rem;
			transition: all 0.3s;
			transform-origin: top left;
			#default {
				display: block;
			}
			*:not(#default) {
				display: none;
			}
		}
		&[data-cursor="default"]{
			svg {
				#default {
					display: block;
				}
				*:not(#default) {
					display: none;
				}
			}
		}
		&[data-cursor="pointer"] {
			&,
			svg {
				color: #efe120;
			}
			svg {
				#pointer {
					display: block;
				}
				*:not(#pointer) {
					display: none;
				}
			}
		}
		&[data-state*="active"] {
			svg {
				transform: scale(0.8)
			}
		}
	`
}