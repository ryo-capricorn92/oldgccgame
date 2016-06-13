console.log('script.js start');



//**********VARIABLES**********//
//declare all variables in the "all" object, to contain all local variables
var all = {
	//set all user info values
	userInfo: {
		name: '',
		energy: 20,
		exp: 0,
		level: 1,
		items: {
			money: 0,
			//items that can be found throughout the games - will not show in lists if the user has none
		},
		//to hold the user's companion dog, should they have one
		companion: false
	},
	//set all time variables
	times: {
		//variable to hold the current time - to be reset any time the time is checked
		currentTime: new Date(),
		//variable to hold the time an hour from the last rollover, when the new rollover is allowed to happen
		rollTime: new Date(),
		//variable to hold the next midnight, when a new daily reward is allowed
		midnight: new Date(),
		//variable to hold when the next energy point will be earned
		nextEnergy: new Date()
	},
	//variable to hold variables needed to start a new game
	start: {
		//variable to tell whether the user has started a game before or not
		save: false,
		//how many rolls the user has left for each of the starter pair dogs
		femaleCount: 5,
		maleCount: 5,
		//variables to hold each rolled dog
		male: false,
		female: false
	},
	breed: {
		//holds the pair of dogs to breed
		male: false,
		female: false,
		//array to hold all puppies bred - to be emptied after each breeding
		puppies: [],
		//how many puppies have been kept - only 2 can be kept from any litter
		keptPuppies: 0
	},
	//array to keep all owned dogs
	ownedDogs: []
}

//**********OBJECT CONSTRUCTORS**********//
function Dog() {
	this.size = '';
	this.head = '';
	this.body = '';
	this.legs = '';
	this.tail = '';
	this.ears = '';
	this.eyes = '';
	this.fur = '';
	this.color = '';
	this.physical = {
		size: 0,
		head: 0,
		body: 0,
		legs: 0,
		tail: 0,
		ears: 0,
		eyes: 0,
		fur: 0
	}
	this.cooldown = 0;
	this.skills = {
		strength: 0,
		agility: 0,
		speed: 0,
		loyalty: 0,
		aggression: 0,
		resilience: 0,
		endurance: 0,
		intelligence: 0
	};
	this.colorGenes = {
		g1: {
			a1: 0,
			a2: 0
		},
		g2: {
			a1: 0,
			a2: 0
		},
		g3: {
			a1: 0,
			a2: 0
		},
		g4: {
			a1: 0,
			a2: 0
		},
		g5: {
			a1: 0,
			a2: 0
		},
		g6: {
			a1: 0,
			a2: 0
		},
		g7: {
			a1: 0,
			a2: 0
		},
		g8: {
			a1: 0,
			a2: 0
		}
	};
	this.otherGenes = {
		g1: {
			a1: 0,
			a2: 0
		},
		g2: {
			a1: 0,
			a2: 0
		},
		g3: {
			a1: 0,
			a2: 0
		},
		g4: {
			a1: 0,
			a2: 0
		},
		g5: {
			a1: 0,
			a2: 0
		},
		g6: {
			a1: 0,
			a2: 0
		}
	};
	this.image = '';
}

//**********METHODS**********//

//***TIME METHODS***//
//creates a date method that allows minutes to be added to a time
Date.prototype.addMinutes = function(m) {
	this.SetTime(this.getTime() + (m*60*1000));
	return this;
}

//creates a date method that allows hours to be added to a time
Date.prototype.addHours = function(h) {
   this.setTime(this.getTime() + (h*60*60*1000));
   return this;
}

//creates a date method that allows days to be added to a date
Date.prototype.addDays = function(d) {
	this.setDate(this.getDate() + d);
	return this;
}

//creates a date method that allows a date to be changed to the next midnight
Date.prototype.toMidnight = function() {
	this.addDays(1);
	this.setHours(0,0,0,0);
	return this;
}


//***DOG METHODS***//
//method to copy a dog without copying the reference (allows one dog to be changed without affecting the others)
Dog.prototype.addDog = function() {
	return this;
};

//method used in dogGen - dog generated is a puppy bred from two parents - use their genetics to determin dog's
Dog.prototype.breedFromDogs = function(dog1, dog2) {
	//loop through all genes in color genes and assign them per genetics rules from parents (ie, one alele from Parent A, one alele from Parent B)
	for (var key in this.colorGenes) {
		if (random01()) {
			//dog's first alele will be from dog1 and second alele will be from dog2
			if (random01()) {
				//dog's first alele will be dog1's first alele
				this.colorGenes[key].a1 = dog1.colorGenes[key].a1;
			} else {
				//dog's first alele will be dog1'a second alele
				this.colorGenes[key].a1 = dog1.colorGenes[key].a2;
			}

			if (random01()) {
				//dog's second alele will be dog2's first alele
				this.colorGenes[key].a2 = dog2.colorGenes[key].a1;
			} else {
				//dog's second alele will be dog2's second alele
				this.colorGenes[key].a2 = dog2.colorGenes[key].a2;
			}
		} else {
			//dog's first alele will be from dog2 and second alel will be from dog1
			if (random01()) {
				//dog's first alele will be dog2's first alele
				this.colorGenes[key].a1 = dog2.colorGenes[key].a1;
			} else {
				//dog's first alele will be dog2's second alele
				this.colorGenes[key].a1 = dog2.colorGenes[key].a2;
			}

			if (random01()) {
				//dog's second alele will be dog1's first alele
				this.colorGenes[key].a2 = dog1.colorGenes[key].a1;
			} else {
				//dog's second alele will be dog1's second alele
				this.colorGenes[key].a2 = dog1.colorGenes[key].a2;
			}
		}
	}

	//same thing repeated for other genes
	for (var key in this.otherGenes) {
		if (random01()) {
			//dog's first alele will be from dog1 and second alele will be from dog2
			if (random01()) {
				//dog's first alele will be dog1's first alele
				this.otherGenes[key].a1 = dog1.otherGenes[key].a1;
			} else {
				//dog's first alele will be dog1'a second alele
				this.otherGenes[key].a1 = dog1.otherGenes[key].a2;
			}

			if (random01()) {
				//dog's second alele will be dog2's first alele
				this.otherGenes[key].a2 = dog2.otherGenes[key].a1;
			} else {
				//dog's second alele will be dog2's second alele
				this.otherGenes[key].a2 = dog2.otherGenes[key].a2;
			}
		} else {
			//dog's first alele will be from dog2 and second alel will be from dog1
			if (random01()) {
				//dog's first alele will be dog2's first alele
				this.otherGenes[key].a1 = dog2.otherGenes[key].a1;
			} else {
				//dog's first alele will be dog2's second alele
				this.otherGenes[key].a1 = dog2.otherGenes[key].a2;
			}

			if (random01()) {
				//dog's second alele will be dog1's first alele
				this.otherGenes[key].a2 = dog1.otherGenes[key].a1;
			} else {
				//dog's second alele will be dog1's second alele
				this.otherGenes[key].a2 = dog1.otherGenes[key].a2;
			}
		}
	}

	//roll skill values from parent's values
	//RULES: value is to be rolled between half of the smaller starting value and the largest value
	//RULES (con't): then add a third of the smaller value to the rolled sum
	//EXAMPLE: if Parent A has skill of 6 and Parent B has skill of 15, roll between 3 and 15, then add 2
	//This allows the puppy to have marginally higher or lower skill than the parents

	for (var key in this.skills) {
		if (dog1.skills[key] > dog2.skills[key]) {
			var one = dog1.skills[key];
			var two = dog2.skills[key];
		} else {
			var one = dog2.skills[key];
			var two = dog1.skills[key];
		}

		this.skills[key] = Math.round(randomNum((two/2), one) + (two/3));
	}

	return this;
}

//method to give the dog a string value interpretation of it's color genetics
Dog.prototype.colorGen = function() {
	//check each gene to see what genetics are applied
	//the color genes are as follows:
	//gene1 is the Sable gene - Always homozygous recessive in starting pair - DD: Wolf Sable - Dr: Sable - rr: shows gene2
	//gene2 is the Irish gene - DD: Solid - Dr: Irish - rr: Piebald
	//gene3 is the Merle gene - DD/Dr: no change - rr: Merle
	//gene4 is the Chocolate gene - DD/Dr: Black - rr: Chocolate
	//gene5 is the Dilute gene - DD/Dd: Black (or Chocolate) - rr: Blue (or Isabella)
	//gene6 is the Points Gene - DD/Dr: no points - rr: points
	//gene7 is the Points Color gene - DD: Red - Dr: Tan - rr: Brindle
	//gene8 is the Points Color Masking gene - DD/Dr: no change - rr: dog's base color is now dependant on gene7
	//gene8 is also affected by recessive coloration - DD: Cream - Dr: Silver - rr: Silver Brindle

	//check if wolf sable or sable is present (masks all other genes)
	if (this.colorGenes.g1.a1 && this.colorGenes.g1.a2) {
		this.color = "Wolf Sable";
		this.image += '<img class="wolfSable" src="imgs/trans.png"/>';
	} else if (this.colorGenes.g1.a1 || this.colorGenes.g1.a2) {
		this.color = "Sable";
		this.image += '<img class="sable" src="imgs/trans.png"/>';
	} else {
		//checking color only first
		//check if point color masks regular color
		if (!this.colorGenes.g8.a1 && !this.colorGenes.g8.a2) {
			//if it does, check if dilute is present
			if (this.colorGenes.g5.a1 || this.colorGenes.g5.a2) {
				//if it isn't, check the point color
				if (this.colorGenes.g7.a1 && this.colorGenes.g7.a2) {
					//if homozygous dominant, color is red
					this.color = "Red";
					this.image += '<img class="red" src="imgs/trans.png"/>';
				} else if (this.colorGenes.g7.a1 || this.colorGenes.g7.a2) {
					//if heterozygous, color is Tan, shown as Fawn
					this.color = "Fawn";
					this.image += '<img class="fawn" src="imgs/trans.png"/>';
				} else {
					//if homozygous recessive, color is Brindle
					this.color = "Brindle";
					this.image += '<img class="brindle" src="imgs/trans.png"/>';
				}
			} else {
				//if it is, check the point color
				if (this.colorGenes.g7.a1 && this.colorGenes.g7.a2) {
					//if dilute and homozygous dominant, color is Cream
					this.color = "Cream";
					this.image += '<img class="cream" src="imgs/trans.png"/>';
				} else if (this.colorGenes.g7.a1 || this.colorGenes.g7.a2) {
					//if dilute and heterozygous, color is Silver
					this.color = "Silver";
					this.image += '<img class="silver" src="imgs/trans.png"/>';
				} else {
					//if dilute and homozygous recessive, color is Silver Brindle
					this.color = "Silver Brindle";
					this.image += '<img class="silverBrindle" src="imgs/trans.png"/>';
				}
			}
		} else {
			//if point color does not mask, check chocolate gene
			if (!this.colorGenes.g4.a1 && !this.colorGenes.g4.a2) {
				//if chocolate is present, check for dilute
				if (!this.colorGenes.g5.a1 && !this.colorGenes.g5.a2) {
					//if dilute and chocolate
					this.color = "Isabella";
					this.image += '<img class="isabella" src="imgs/trans.png"/>';
				} else {
					//if no dilute and chocolate
					this.color = "Chocolate";
					this.image += '<img class="chocolate" src="imgs/trans.png"/>';
				}
			} else {
				//if chocolate is not present, check for dilute
				if (!this.colorGenes.g5.a1 && !this.colorGenes.g5.a2) {
					//if dilute and black
					this.color = "Blue";
					this.image += '<img class="blue" src="imgs/trans.png"/>';
				} else {
					//if no dilute and black
					this.color = "Black";
					this.image += '<img class="black" src="imgs/trans.png"/>';
				}
			}
		}

		//checking pattern only, adding to color string
		//check for merle, gene3
		if (!this.colorGenes.g3.a1 && !this.colorGenes.g3.a2) {
			//if merle is present, add merle
			this.color += ' Merle';
			this.image += '<img class="merle" src="imgs/trans.png"/>';
		}

		//check gene2, Solid vs Irish vs Piebald
		if(this.colorGenes.g2.a1 && this.colorGenes.g2.a2) {
			this.color += ' (Solid)';
		} else if (this.colorGenes.g2.a1 || this.colorGenes.g2.a2) {
			this.color += ' and White (Irish)';
			this.image += '<img class="irish" src="imgs/trans.png"/>';
		} else {
			this.color += ' and White (Piebald)';
			this.image += '<img class="piebald" src="imgs/trans.png"/>';
		}

		//check gene6, points or no points
		//first check if points mask color
		if (this.colorGenes.g8.a1 || this.colorGenes.g8.a2) {
		//if points do not mask, then allow points
			if (!this.colorGenes.g6.a1 && !this.colorGenes.g6.a2) {
				//if points, check if dilute
				if (this.colorGenes.g5.a1 || this.colorGenes.g5.a2) {
					//if no dilute, check points color
					if (this.colorGenes.g7.a1 && this.colorGenes.g7.a2) {
						this.color += ' with Red Points';
						this.image += '<img class="redPoints" src="imgs/trans.png"/>';
					} else if (this.colorGenes.g7.a1 || this.colorGenes.g7.a2) {
						this.color += ' wiht Tan Points';
						this.image += '<img class="fawnPoints" src="imgs/trans.png"/>';
					} else {
						this.color += ' with Brindle Points';
						this.image += '<img class="brindlePoints" src="imgs/trans.png"/>';
					}
				} else {
					//if dilute, check points color
					if (this.colorGenes.g7.a1 && this.colorGenes.g7.a2) {
						this.color += ' with Cream Points';
						this.image += '<img class="creamPoints" src="imgs/trans.png"/>';
					} else if (this.colorGenes.g7.a1 || this.colorGenes.g7.a2) {
						this.color += ' with Silver Points';
						this.image += '<img class="silverPoints" src="imgs/trans.png"/>';
					} else {
						this.color += ' with Silver Brindle Points';
						this.image += '<img class="silverBrindlePoints" src="imgs/trans.png"/>';
					}
				}
			}
		}
	}
	//check the dog's eye color to add the eye color to the dog's image
	if (this.eyes === "Brown") {
		this.image += '<img class="brownEyes" src="imgs/trans.png"/>';
	} else if (this.eyes === "Amber") {
		this.image += '<img class="amberEyes" src="imgs/trans.png"/>';
	} else {
		this.image += '<img class="blueEyes" src="imgs/trans.png"/>';
	}
	//add color to the nose (added here to make it easier to add different nose colors later)
	this.image += '<img class="blackNose" src="imgs/trans.png"/>';
	//add the dog outline over the colors determined by genetics
	this.image += '<img class="male" src="imgs/trans.png"/>';

	return this;
}

//method to give the dog a string value interpretation of it's other genetics
Dog.prototype.otherGen = function() {
	//check each gene to see what genetics are applied
	//the other genes are as follows:
	//gene1 - nub tail
	//gene2 - curly tail (takes precedence over nub)
	//gene3 - button/drop ears (only show button ears when ears are tiny)
	//gene4 - drop coat
	//gene5 - wire coat
	//if drop coat and wire coat are both present, coat is curly
	//gene6 - hairless (only shows if gene4 and gene5 do not show)

	//check if curly tail shows. If not, check if nub tail shows
	if (!this.otherGenes.g2.a1 && !this.otherGenes.g2.a2) {
		this.tail = 'Curly';
	} else {
		if (!this.otherGenes.g1.a1 && !this.otherGenes.g1.a2) {
			this.tail = 'Nub';
		}
	}

	//check if drop ears are present. If so, check if they are tiny. If so, ears are button. If not, ears are drop
	if (!this.otherGenes.g3.a1 && !this.otherGenes.g3.a2) {
		if (this.ears === 'Tiny') {
			this.ears = 'Button';
		} else {
			this.ears = 'Drop';
		}
	}

	//check if drop coat and wire coat are both present. If so, coat is curly. If not, check if drop coat or wire coat is present.
	//If neither, check if hairless is present
	if ((!this.otherGenes.g4.a1 && !this.otherGenes.g4.a2) && (!this.otherGenes.g5.a1 && !this.otherGenes.g5.a2)) {
		this.fur = 'Curly';
	} else if (!this.otherGenes.g4.a1 && !this.otherGenes.g4.a2) {
		this.fur = 'Drop Coat';
	} else if (!this.otherGenes.g5.a1 && !this.otherGenes.g5.a2) {
		this.fur = 'Wire';
	} else if (!this.otherGenes.g6.a1 && !this.otherGenes.g6.a2) {
		this.fur = 'Hairless';
	}

	return this;
}

//gives the dog a string version of its age
Dog.prototype.ageGen = function() {
	//dog's ageValue is counted in months
	//takes how many whole years the dog has lived and puts it in the years variable
	var years = Math.floor(this.ageValue / 12);
	//takes the remaining months and puts them in the months variable
	var months = this.ageValue % 12;

	//if the dog has lived 0 months
	if (!this.ageValue) {
		//say as such
		this.age = '0 years and 0 months';
	//otherwise, say how many years and month the dog has lived
	} else {
		this.age = '' + years + (years === 1 ? ' year ' : ' years ') + months + (months === 1 ? ' month' : ' months');
	}

	return this;
}

//gives the dog a string version of its gender
Dog.prototype.genderGen = function() {
	//uses the boolean value of genderValue
	//if genderValue is 1, then it's female
	if (this.genderValue) {
		this.gender = 'Female';
	//if genderValue is 0, then it's male
	} else {
		this.gender = 'Male';
	}

	return this;
}

//check the numerical values for the physical aspecs of the dog and assign them the proper string value
Dog.prototype.physicalGen = function() {
	switch(this.physical.size) {
		case 1:
		  this.size = 'Extra Small';
			break;
		case 2:
		case 3:
		  this.size = 'Small';
			break;
		case 4:
		case 5:
		case 6:
		case 7:
		  this.size = 'Medium';
			break;
		case 8:
		case 9:
		  this.size = 'Large';
			break;
		case 10:
		  this.size = 'Extra Large';
			break;
		default:
		  this.size = 'ERROR - in physicalGen method';
			break;
	};

	switch (this.physical.head) {
		case 1:
		case 2:
		case 3:
		  this.head = 'Slim';
			break;
		case 4:
		case 5:
		case 6:
		case 7:
		  this.head = 'Average';
			break;
		case 8:
		case 9:
		case 10:
		  this.head = 'Block';
			break;
		default:
		  this.head = 'ERROR - in physicalGen method';
			break;
	};

	switch(this.physical.body) {
		case 1:
		case 2:
		  this.body = 'Petite';
			break;
		case 3:
		case 4:
		case 5:
		  this.body = 'Lean';
			break;
		case 6:
		case 7:
		case 8:
		  this.body = 'Sturdy';
			break;
		case 9:
		case 10:
		  this.body = 'Stocky';
			break;
		default:
		  this.body = 'ERROR - in physicalGen method';
			break;
	};

	switch(this.physical.legs) {
		case 1:
		case 2:
		  this.legs = 'Stubby';
			break;
		case 3:
		case 4:
		case 5:
		case 6:
		case 7:
		  this.legs = 'Average';
			break;
		case 8:
		case 9:
		case 10:
		  this.legs = 'Long';
			break;
		default:
		  this.legs = 'ERROR - in physicalGen method';
			break;
	};

	switch(this.physical.tail) {
		case 1:
		case 2:
		case 3:
		  this.tail = 'Short';
			break;
		case 4:
		case 5:
		case 6:
		  this.tail = 'Medium';
			break;
		case 7:
		case 8:
		case 9:
		  this.tail = 'Long';
			break;
		case 10:
		  this.tail = 'Flag';
			break;
		default:
		  this.tail = 'ERROR - in physicalGen method';
			break;
	};

	switch(this.physical.ears) {
		case 1:
		case 2:
		case 3:
		  this.ears = 'Tiny';
			break;
		case 4:
		case 5:
		case 6:
		case 7:
		  this.ears = 'Average';
			break;
		case 8:
		case 9:
		case 10:
		  this.ears = 'Large';
			break;
		default:
		  this.ears = 'ERROR - in physicalGen method';
			break;
	};

	switch(this.physical.eyes) {
		case 1:
		  this.eyes = 'Amber';
			break;
		case 2:
		case 3:
		case 4:
		case 5:
		case 6:
		  this.eyes = 'Brown';
			break;
		case 7:
		  this.eyes = 'Heterochromatic';
			break;
		case 8:
		case 9:
		case 10:
		  this.eyes = 'Blue';
			break;
	};

	switch(this.physical.fur) {
		case 1:
		case 2:
		case 3:
		  this.fur = 'Long';
			break;
		case 4:
		case 5:
		case 6:
		case 7:
		  this.fur = 'Short';
			break;
		case 8:
		case 9:
		case 10:
		  this.fur = 'Smooth';
			break;
		default:
		  this.fur = 'ERROR - in physicalGen Method';
			break;
	};

	return this;
}

//removes the possibility of homozygous recessive in the dog - to be used on first roll dogs and dogs found in the wild
Dog.prototype.removeRecessive = function() {
	//check for merle and continue retrying until it has at least one dominant alele
	while (!this.colorGenes.g3.a1 && !this.colorGenes.g3.a2) {
		this.colorGenes.g3.a1 = random01();
		this.colorGenes.g3.a2 = random01();
	}

	//check for chocolate and continue retrying until it has at least one dominant alele
	while (!this.colorGenes.g4.a1 && !this.colorGenes.g4.a2) {
		this.colorGenes.g4.a1 = random01();
		this.colorGenes.g4.a2 = random01();
	}

	//check for dilute and continue retrying until it has at least one dominant alele
	while (!this.colorGenes.g5.a1 && !this.colorGenes.g5.a2) {
		this.colorGenes.g5.a1 = random01();
		this.colorGenes.g5.a2 = random01();
	}

	//check for show points and continue retrying until it has at least one dominant alele
	while (!this.colorGenes.g6.a1 && !this.colorGenes.g6.a2) {
		this.colorGenes.g6.a1 = random01();
		this.colorGenes.g6.a2 = random01();
	}

	//check for points masking and continue retrying until it has at least one dominant alele
	while (!this.colorGenes.g8.a1 && !this.colorGenes.g8.a2) {
		this.colorGenes.g8.a1 = random01();
		this.colorGenes.g8.a2 = random01();
	}

	//check for nub tail and continue retrying until it has at least one dominant alele
	while (!this.otherGenes.g1.a1 && !this.otherGenes.g1.a2) {
		this.otherGenes.g1.a1 = random01();
		this.otherGenes.g1.a2 = random01();
	}

	//check for curly tail and continue retrying until it has at least one dominant alele
	while (!this.otherGenes.g2.a1 && !this.otherGenes.g2.a2) {
		this.otherGenes.g2.a1 = random01();
		this.otherGenes.g2.a2 = random01();
	}

	//check for drop ears and continue retrying until it has at least one dominant alele
	while (!this.otherGenes.g3.a1 && !this.otherGenes.g3.a2) {
		this.otherGenes.g3.a1 = random01();
		this.otherGenes.g3.a2 = random01();
	}

	//check for drop coat and continue retrying until it has at least one dominant alele
	while (!this.otherGenes.g4.a1 && !this.otherGenes.g4.a2) {
		this.otherGenes.g4.a1 = random01();
		this.otherGenes.g4.a2 = random01();
	}

	//check for wire coat and continue retrying until it has at least one dominant alele
	while (!this.otherGenes.g5.a1 && !this.otherGenes.g5.a2) {
		this.otherGenes.g5.a1 = random01();
		this.otherGenes.g5.a2 = random01();
	}

	//check for hairless and continue retrying until it has at least one dominant alele
	while (!this.otherGenes.g6.a1 && !this.otherGenes.g6.a2) {
		this.otherGenes.g6.a1 = random01();
		this.otherGenes.g6.a2 = random01();
	}

	//rerun colorGen and otherGen to change the string value of the new genes
	this.recheckDog();

	return this;
}

//allows chocolate and points the chance to show - to be used on first roll dogs
Dog.prototype.allowRecessive = function() {
	var random = random01();
	this.colorGenes.g4.a1 = random ? random01() : 1;
	random = random01();
	this.colorGenes.g4.a2 = random ? random01() : 1;
	random = random01();
	this.colorGenes.g6.a1 = random ? random01() : 1;
	random = random01();
	this.colorGenes.g6.a2 = random ? random01() : 1;
	this.recheckDog();
	return this;
}

//rechecks the dog's genetics in case of any genetic changes caused by removeRecessive and allowRecessive
//simply reruns colorGen and otherGen, and rechecks the string values for tail, ears, and fur
Dog.prototype.recheckDog = function() {
	//rerun the this through physicalGen, colorGen and otherGen to change the string of any changed values
	this.physicalGen().colorGen().otherGen();
	return this;
};



//********************FUNCTIONS********************//

//**********RANDOM**********//
function randomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random01() {
	return Math.round(Math.random());
}

//**********DOG CREATION FUNCTIONS**********//
function dogGen(dog1, dog2) {

	//generate the first dog using the Dog constructor.
	var dog = new Dog();

	//assign gender and give the assigned gender a string value
	dog.genderValue = random01();
	dog.genderGen();

	//loop through all elements in physical (the numerical values of the dog's physical traits) and assign them a value based on the dogs passed in ()
	for (var key in dog.physical) {
		dog.physical[key] = rollPhysicalValues(dog1, dog2, key);
	}

	if (!dog1 && !dog2) {
		//loop through all genes and assign them recessive or dominant
		for (var key in dog.colorGenes) {
			for (var innerKey in dog.colorGenes[key]) {
				dog.colorGenes[key][innerKey] = rollGenes();
			}
		}
		for (var key in dog.otherGenes) {
			for (var innerKey in dog.otherGenes[key]) {
				dog.otherGenes[key][innerKey] = rollGenes();
			}
		}

		//set sable gene to have 50/50 chance
		dog.colorGenes.g1.a1 = random01();
		dog.colorGenes.g1.a2 = random01();

		//roll the new dog's skill values - between 1 and 20
		for (var key in dog.skills) {
			dog.skills[key] = randomNum(1, 20);
		}
	} else {
		dog.breedFromDogs(dog1, dog2);
	}

  //run color- and otherGen to get the string values and image values of the genetics
	dog.colorGen().otherGen();

	return dog;
}

function rollPhysicalValues(dog1, dog2, key) {
	var random;

	//sets one to the higher value and two to the lower value
	if (dog1 && dog2) {
		if (dog1.physical[key] >= dog2.physical[key]) {
			var one = dog1.physical[key];
			var two = dog2.physical[key];
		} else {
			var one = dog2.physical[key];
			var two = dog1.physical[key];
		}
	} else {
		var one = 10;
		var two = 1;
	}

  //gives the value a 1 in 3 chance of rolling one outside of it's range
  random = randomNum(0, 2);
	if (!random && one < 10) {
		one++;
	} else {
		random = randomNum(0, 2);
		if (!random && two > 1) {
			two--;
		}
	}

  return randomNum(two, one);
}

function rollGenes() {
	//1 in 4 chance the gene will be recessive
	var random = randomNum(0, 3);
	//if gene is 0, return recessive, otherwise return dominant
	return random ? 1 : 0;
}

//**********TIME FUNCTIONS**********//



//**********TAB FUCNTIONS**********//


console.log('script.js end');
