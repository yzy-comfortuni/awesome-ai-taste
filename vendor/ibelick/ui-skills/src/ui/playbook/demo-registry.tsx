import { playbookDemoSlugs } from "../../data/playbook-demos";
import AspectRatioDemo from "./aspect-ratio-demo";
import TextBalanceDemo from "./text-balance-demo";
import TabularNumsDemo from "./tabular-nums-demo";
import TouchTargetDemo from "./touch-target-demo";
import ConcentricRadiusDemo from "./concentric-radius-demo";
import ScaleOnPressDemo from "./scale-on-press-demo";
import PopoverOriginDemo from "./popover-origin-demo";
import SpaceNotLinesDemo from "./space-not-lines-demo";
import ScrollPeekDemo from "./scroll-peek-demo";
import ImageOutlineDemo from "./image-outline-demo";
import LineClampDemo from "./line-clamp-demo";
import TextContrastDemo from "./text-contrast-demo";
import ScaleEnterDemo from "./scale-enter-demo";
import SkeletonLoadingDemo from "./skeleton-loading-demo";
import OneAccentDemo from "./one-accent-demo";
import LineMeasureDemo from "./line-measure-demo";
import ShadowElevationDemo from "./shadow-elevation-demo";
import FocusRingDemo from "./focus-ring-demo";
import InlineErrorDemo from "./inline-error-demo";
import LabelFormFieldsDemo from "./label-form-fields-demo";
import EmptyStateCtaDemo from "./empty-state-cta-demo";
import SentenceCaseLabelsDemo from "./sentence-case-labels-demo";
import StatusNotColorAloneDemo from "./status-not-color-alone-demo";
import EaseOutEnterDemo from "./ease-out-enter-demo";
import OpticalAlignmentDemo from "./optical-alignment-demo";
import IconStrokeWeightDemo from "./icon-stroke-weight-demo";
import OutlineIconsDefaultDemo from "./outline-icons-default-demo";
import NoGlowCtaDemo from "./no-glow-cta-demo";
import IconStateCrossfadeDemo from "./icon-state-crossfade-demo";
import BreathingRoomDemo from "./breathing-room-demo";
import InsetCtaDemo from "./inset-cta-demo";
import HeadingLineHeightDemo from "./heading-line-height-demo";
import TrackingBySizeDemo from "./tracking-by-size-demo";
import DestructiveDialogDemo from "./destructive-dialog-demo";
import ScrollEdgeFadeDemo from "./scroll-edge-fade-demo";
import StaggerEnterDemo from "./stagger-enter-demo";
import SubtleExitDemo from "./subtle-exit-demo";
import TooltipWarmDemo from "./tooltip-warm-demo";
import InterruptibleTransitionDemo from "./interruptible-transition-demo";
import MotionRestraintDemo from "./motion-restraint-demo";
import SpringVsEaseDemo from "./spring-vs-ease-demo";
import MenuExitDemo from "./menu-exit-demo";
import ColorMeansLinkDemo from "./color-means-link-demo";
import ModalScrimDemo from "./modal-scrim-demo";
import SoftTruncateDemo from "./soft-truncate-demo";
import SamePathMotionDemo from "./same-path-motion-demo";
import LabelMorphDemo from "./label-morph-demo";

export const demos = {
  "reserve-space-with-aspect-ratio": AspectRatioDemo,
  "use-text-balance": TextBalanceDemo,
  "use-tabular-nums-for-data": TabularNumsDemo,
  "use-large-touch-targets": TouchTargetDemo,
  "use-concentric-border-radius": ConcentricRadiusDemo,
  "add-scale-on-press": ScaleOnPressDemo,
  "anchor-popovers-to-triggers": PopoverOriginDemo,
  "group-with-space-not-lines": SpaceNotLinesDemo,
  "peek-the-next-scroll-item": ScrollPeekDemo,
  "outline-images-neutrally": ImageOutlineDemo,
  "clamp-overflowing-titles": LineClampDemo,
  "keep-secondary-text-readable": TextContrastDemo,
  "avoid-entering-from-scale-zero": ScaleEnterDemo,
  "use-structural-skeletons": SkeletonLoadingDemo,
  "limit-accent-color-usage": OneAccentDemo,
  "cap-line-length": LineMeasureDemo,
  "use-shadow-for-elevation": ShadowElevationDemo,
  "show-visible-focus-rings": FocusRingDemo,
  "show-errors-beside-fields": InlineErrorDemo,
  "label-every-form-field": LabelFormFieldsDemo,
  "give-empty-states-one-action": EmptyStateCtaDemo,
  "use-sentence-case-labels": SentenceCaseLabelsDemo,
  "pair-status-with-labels": StatusNotColorAloneDemo,
  "use-ease-out-on-enter": EaseOutEnterDemo,
  "align-icons-optically": OpticalAlignmentDemo,
  "match-icon-stroke-weight": IconStrokeWeightDemo,
  "use-outline-icons-by-default": OutlineIconsDefaultDemo,
  "avoid-glow-primary-actions": NoGlowCtaDemo,
  "animate-icon-state-changes": IconStateCrossfadeDemo,
  "give-targets-breathing-room": BreathingRoomDemo,
  "inset-primary-actions": InsetCtaDemo,
  "tighten-heading-line-height": HeadingLineHeightDemo,
  "tune-tracking-by-size": TrackingBySizeDemo,
  "confirm-destructive-actions": DestructiveDialogDemo,
  "fade-scroll-edges": ScrollEdgeFadeDemo,
  "stagger-infrequent-entrances": StaggerEnterDemo,
  "keep-exits-subtle": SubtleExitDemo,
  "warm-toolbar-tooltips": TooltipWarmDemo,
  "use-interruptible-transitions": InterruptibleTransitionDemo,
  "restrain-high-frequency-motion": MotionRestraintDemo,
  "use-ease-not-spring-for-feedback": SpringVsEaseDemo,
  "fade-menus-out": MenuExitDemo,
  "reserve-brand-color-for-links": ColorMeansLinkDemo,
  "use-solid-modal-scrims": ModalScrimDemo,
  "fade-truncated-text": SoftTruncateDemo,
  "enter-and-exit-on-the-same-path": SamePathMotionDemo,
  "blur-imperfect-label-morphs": LabelMorphDemo,
} as const;

export const registeredDemoSlugs = Object.keys(demos);

if (registeredDemoSlugs.join("\n") !== playbookDemoSlugs.join("\n")) {
  throw new Error("Playbook demo registry and data slugs are out of sync");
}
