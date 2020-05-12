import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { HrdAuthService } from '@services/hrd-auth.service';
import { Subscription } from '@workspace/node_modules/rxjs';

@Directive({
  selector: '[hrdPrivilege]'
})
export class HrdPrivilegeDirective implements OnDestroy {
  private subs: Subscription;
  private level = 0;

  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef,
              private auth: HrdAuthService) {
    this.subs = this.auth.subj.subscribe(value => {
      if (value >= this.level) {
        this.viewContainer.clear();
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    });
  }

  @Input() set hrdPrivilege(level: number) {
    this.level = level;
    if (this.auth.user.privilege >= level) {
      this.viewContainer.clear();
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
