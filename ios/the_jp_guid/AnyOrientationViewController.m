#import <Foundation/Foundation.h>
#import "AnyOrientationViewController.h"

@implementation AnyOrientationViewController

- (BOOL)shouldAutorotate {
    return YES;
}

- (UIInterfaceOrientationMask)supportedInterfaceOrientations {
    return UIInterfaceOrientationMaskAll;
}

@end

