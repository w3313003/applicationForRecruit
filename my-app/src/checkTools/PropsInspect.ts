namespace PropsInspect {
	export interface Main {
		data: any;
	}
	export interface NoCheck {
		[index: string]: any;
	}
	export interface AuthProps {
		redirectTo?: string;
	}
	export interface RouterProps {
		history?: any;
		location?: any;
		match?: any;
	}
	export interface ActionInspect {
		type: string;
		payload?: any;
	}
	
}