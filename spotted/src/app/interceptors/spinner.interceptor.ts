import { inject } from "@angular/core";
import { HttpInterceptorFn } from "@angular/common/http";
import { SpinnerService } from "../services/spinner/spinner.service";
import { finalize } from "rxjs";

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
    const spinnerService = inject(SpinnerService);
    spinnerService.show();
    return next(req).pipe(
        finalize(() => spinnerService.hide())
    );
};