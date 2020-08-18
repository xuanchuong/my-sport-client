import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
	}
];

@NgModule({
		imports: [RouterModule.forChild(routes)],
		exports: [RouterModule]
	}
)
export class AccountRoutingModule {}